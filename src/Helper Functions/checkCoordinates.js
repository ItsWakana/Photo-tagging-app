export const checkCoordinates = (currentCoordinates, fetchedCoordinates) => {

    return currentCoordinates.x >= fetchedCoordinates.xStart && currentCoordinates.x <= fetchedCoordinates.xEnd && currentCoordinates.y >= fetchedCoordinates.yStart && currentCoordinates.y <= fetchedCoordinates.yEnd

}