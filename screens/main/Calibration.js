const ARM_STRAIGHTNESS_THRESHOLD = 0.8 // Perfectly straight is 1
const BODY_SIDES = {right: "right", left: "left"}

// ===== Common geometry functions =====
const isPointInsideShape = (point, polygonPoints) => {
    // Based on func found in: https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
    var x = point.x, y = point.y;
    var inside = false;
    for (var i = 0, j = polygonPoints.length - 1; i < polygonPoints.length; j = i++) {
        var xi = polygonPoints[i].x, yi = polygonPoints[i].y;
        var xj = polygonPoints[j].x, yj = polygonPoints[j].y;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};
const distBetweenPoints = (pointA, pointB) => {
    const a = pointA.x - pointB.x;
    const b = pointA.y - pointB.y;
    return Math.sqrt(a * a + b * b);
}
function findAngleABC(pointA, pointB, pointC) {
    var AB = distBetweenPoints(pointA, pointB)
    var BC = distBetweenPoints(pointB, pointC)
    var AC = distBetweenPoints(pointA, pointC)
    return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
}
const findMidPtBetweenPts = (pointA, pointB) => {
    const yDiff = pointB.y - pointA.y
    const xDiff = pointB.x - pointA.x
    return { x: pointA.x + xDiff * 0.5, y: pointA.y + yDiff * 0.5 }
}
// ===== Check pose functions ===== 
const getWristName = side => (`${side}_wrist`)
const getShoulderName = side => (`${side}_shoulder`)
const getHipName = side => (`${side}_hip`)
const getElbowName = side => (`${side}_elbow`)

const isAHigherThanB = (pointA, pointB) => (pointA.y < pointB.y)
const isPoseOutOfRange = (pose) => {
    const bodyPartPoints = Object.values(pose)
    const outOfRangePoints = bodyPartPoints.filter(pt => pt.x < 0 || pt.y < 0)
    return outOfRangePoints.length > 0
}
const isArmsStraight = (pose) => {
    return armStraightnessValue(pose, BODY_SIDES.right) > ARM_STRAIGHTNESS_THRESHOLD &&
        armStraightnessValue(pose, BODY_SIDES.left) > ARM_STRAIGHTNESS_THRESHOLD
}
const isAOnTheRightOfB = (pointA, pointB) => pointA.x > pointB.x
const isWristOutsideOfHip = (pose) => {
    return isAOnTheRightOfB(pose[getWristName(BODY_SIDES.right)], pose[getHipName(BODY_SIDES.right)]) &&
        isAOnTheRightOfB(pose[getHipName(BODY_SIDES.left)], pose[getWristName(BODY_SIDES.left)])
}
const isBodyPartAOnTheRightOfB = (pose, bodyPartNameFunc) => 
    isAOnTheRightOfB(
        pose[bodyPartNameFunc(BODY_SIDES.right)], 
        pose[bodyPartNameFunc(BODY_SIDES.left)]
    )
const isBodyFacingCamera = pose => {
    return isBodyPartAOnTheRightOfB(pose, getShoulderName) &&
        isBodyPartAOnTheRightOfB(pose, getHipName) &&
        isBodyPartAOnTheRightOfB(pose, getWristName) &&
        isBodyPartAOnTheRightOfB(pose, getElbowName)
}
// =====  Get ring point functions ===== 
const armStraightnessValue = (pose, side = BODY_SIDES.right) => {
    // closer to 1 means straighter
    const shoulder = pose[getShoulderName(side)]
    const wrist = pose[getWristName(side)]
    const elbow = pose[getElbowName(side)]
    return Math.abs(findAngleABC(shoulder, elbow, wrist)/Math.PI)
}
const getBodyPartPointSPose = (savedPoses, bodyPart, pickFromTwoReduceFunc) => {
    return savedPoses.filter(SPose => SPose.value[bodyPart].y !== 0)
        .reduce(pickFromTwoReduceFunc)
}
const getBodyPartPoint = (savedPoses, bodyPart, pickFromTwoReduceFunc) => {
    const selectedPose = getBodyPartPointSPose(savedPoses, bodyPart, pickFromTwoReduceFunc)
    return selectedPose.value[bodyPart]
}
const getHighestBodyPartSavedPose = (sPoseA, sPoseB, bodyPart) => {
    return isAHigherThanB(
        sPoseA.value[bodyPart],
        sPoseB.value[bodyPart]
    ) ? sPoseA : sPoseB
}
const getHighestWristPoint = (savedPoses, side = BODY_SIDES.right) => {
    const wristName = getWristName(side)
    return getBodyPartPoint(savedPoses, wristName, (prevSPose, currSPose) => {
        return getHighestBodyPartSavedPose(prevSPose, currSPose, wristName)
    })
}
const getWidestDistBetweenBodyPartsSavedPose = (sPoseA, sPoseB, bodyPart1, bodyPart2) => {
    const sPoseADist = distBetweenPoints(sPoseA.value[bodyPart1], sPoseA.value[bodyPart2])
    const sPoseBDist = distBetweenPoints(sPoseB.value[bodyPart1], sPoseB.value[bodyPart2])
    return sPoseADist < sPoseBDist ? sPoseB : sPoseA
}
const getWidestWristPoint = (savedPoses, side = BODY_SIDES.right) => {
    const wristName = getWristName(side)
    return getBodyPartPoint(savedPoses, wristName, (prevSPose, currSPose) => {
        return getWidestDistBetweenBodyPartsSavedPose(
            prevSPose, currSPose, wristName, getShoulderName(side))
    })
}
const getEstAngleSavedPose = (sPoseA, sPoseB, bodyPt1, bodyPt2, bodyPt3, est = "largest") => {
    const poseA = sPoseA.value
    const poseB = sPoseB.value
    const sPoseAAngle = findAngleABC(poseA[bodyPt1], poseA[bodyPt2], poseA[bodyPt3])
    const sPoseBAngle = findAngleABC(poseB[bodyPt1], poseB[bodyPt2], poseB[bodyPt3])
    if (est == "largest") return sPoseAAngle < sPoseBAngle ? sPoseB : sPoseA
    else return sPoseAAngle > sPoseBAngle ? sPoseB : sPoseA
}
const getLargestArmpitAnglePose = (savedPoses, side = BODY_SIDES.right) => {
    const wristName = getWristName(side)
    return getBodyPartPointSPose(savedPoses, wristName, (prevSPose, currSPose) => {
        return getEstAngleSavedPose(
            prevSPose, currSPose, wristName, getShoulderName(side), getHipName(side), "largest")
    })
}
const getSmallestArmpitAnglePoint = (savedPoses, side = BODY_SIDES.right) => {
    const wristName = getWristName(side)
    return getBodyPartPoint(savedPoses, wristName, (prevSPose, currSPose) => {
        return getEstAngleSavedPose(
            prevSPose, currSPose, wristName, getShoulderName(side), getHipName(side), "smallest")
    })
}

export const getPoseInvalidDescription = (pose) => {
    var poseDescription = ""
    if (isPoseOutOfRange(pose)) poseDescription += "Out of range! "
    if (!isArmsStraight(pose)) poseDescription += "Arm is not straight! "
    if (!isWristOutsideOfHip(pose)) poseDescription += "Wrist within hips! "
    if (!isBodyFacingCamera(pose)) poseDescription += "Body not facing camera! "
    return poseDescription
}

export const isPoseValid = (pose) => (
    !isPoseOutOfRange(pose) && isArmsStraight(pose) && isWristOutsideOfHip(pose) && isBodyFacingCamera(pose)
)

export const getValidSavedPoses = (savedPoses) => {
    return savedPoses.filter(({ _time, value: pose }) => (isPoseValid(pose)))
}

export const findBubbleCoords = (validSavedPoses) => {
    var bubblePoints = []
    Object.values(BODY_SIDES).forEach(side => {
        const highBubblePose = getLargestArmpitAnglePose(validSavedPoses, side)
        const highBubblePoint = highBubblePose.value[getWristName(side)]
        const lowBubblePoint = getSmallestArmpitAnglePoint(validSavedPoses, side)
        const midBubblePoint = findMidPtBetweenPts(highBubblePoint, lowBubblePoint)
        bubblePoints = [...bubblePoints, highBubblePoint, midBubblePoint]
    })
    return bubblePoints
}