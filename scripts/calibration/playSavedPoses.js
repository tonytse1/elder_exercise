import { findBubbleCoords, isPoseValid, getValidSavedPoses, getPoseInvalidDescription } from '../../screens/main/Calibration.js'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight

const boxMargin = 10
const boxWidth = canvas.width - boxMargin * 2
const boxHeight = canvas.height - boxMargin * 2

const POSE_LINES_TO_DRAW = [
    ['left_wrist', 'left_elbow'],
    ['left_elbow', 'left_shoulder'],
    ['left_shoulder', 'left_hip'],
    ['left_hip', 'left_knee'],
    ['left_knee', 'left_ankle'],
    ['right_wrist', 'right_elbow'],
    ['right_elbow', 'right_shoulder'],
    ['right_shoulder', 'right_hip'],
    ['right_hip', 'right_knee'],
    ['right_knee', 'right_ankle'],
    ['left_shoulder', 'right_shoulder'],
    ['left_hip', 'right_hip']
]

// =====  Translate to Box Point functions ===== 
const getPoseToBoxPointTranslator = (savedPoses) => {
    const allPoints = savedPoses.map(ps => Object.values(ps.value)).flat()
    const PADDING = 20
    const maxX = Math.max(...allPoints.map(p => p.x))
    const maxY = Math.max(...allPoints.map(p => p.y))
    return ({ x, y }) => ({
        x: boxWidth * x / (maxX + PADDING),
        y: boxHeight * y / (maxY + PADDING)
    })
}
const translateToBoxPose = (pose, poseToBoxPointTranslator) => {
    const boxPose = {}
    Object.keys(pose).forEach((name) => {
        boxPose[name] = poseToBoxPointTranslator(pose[name])
    })
    return boxPose
}
// =====  Drawing functions ===== 
const drawDot = ({ x, y }) => {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
}
const drawLine = (x1, y1, x2, y2, stroke = "white") => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 3;
    ctx.stroke();
}
const drawBackdrop = () => {
    ctx.fillStyle = "grey";
    ctx.fillRect(boxMargin, boxMargin, boxWidth, boxHeight);
}
const drawPose = (pose, translateToBoxPoint) => {
    const poseInBox = translateToBoxPose(pose, translateToBoxPoint)
    for (const [_, dot] of Object.entries(poseInBox)) drawDot(dot)
    for (const [name1, name2] of POSE_LINES_TO_DRAW) {
        const pointA = poseInBox[name1]
        const pointB = poseInBox[name2]
        drawLine(pointA.x, pointA.y, pointB.x, pointB.y)
    }
}
const drawCrossOnBox = () => {
    const farX = boxWidth + boxMargin
    const farY = boxHeight + boxMargin
    drawLine(boxMargin, boxMargin, farX, farY, "red")
    drawLine(farX, boxMargin, boxMargin, farY, "red")
}
const drawRing = ({ x, y }, color = "yellow") => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
}
const write = (text) => {
    ctx.fillStyle = "white";
    ctx.font = "30px serif";
    ctx.fillText(text, boxMargin + 10, 50);
}
fetch('saved_poses.json')
    .then(response => response.json())
    .then(savedPoses => {
        let idx = 1
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBackdrop()
            const rescaleToFitPointIntoBox = getPoseToBoxPointTranslator(savedPoses)
            const { time, value: pose } = savedPoses[idx]
            drawPose(pose, rescaleToFitPointIntoBox)
            console.log(idx, new Date(time).toString())

            // Calculate bubble coords directly from app's Calibration.js
            const validSavedPoses = getValidSavedPoses(savedPoses)
            findBubbleCoords(validSavedPoses).forEach(point => {
                drawRing(rescaleToFitPointIntoBox(point))
            })

            // Show whether pose is valid on the front-end
            if (!isPoseValid(pose)) drawCrossOnBox()
            write(getPoseInvalidDescription(pose))

            // Animate next pose according to time recorded
            idx = idx + 1
            const nextSavedPose = savedPoses[idx]
            if (nextSavedPose) {
                setTimeout(
                    () => window.requestAnimationFrame(draw),
                    nextSavedPose.time - time
                )
            }
        }
        window.requestAnimationFrame(draw);
    })