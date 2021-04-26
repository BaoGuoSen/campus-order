
export const getDistance = (lng1, lat1, lng2, lat2) => {
  var m1 = new AMap.Marker({
    draggable: true,
    position: new AMap.LngLat(lng1, lat1)
  })

  var m2 = new AMap.Marker({
    draggable: true,
    position: new AMap.LngLat(lng2, lat2)
  })

  var p1 = m1.getPosition()
  var p2 = m2.getPosition()
  return Math.round(p1.distance(p2))
}

export const getMinDistanceRider = (order, riders) => {
  let min = Number.MAX_VALUE
  let minIndex = 0
  for (let i = 0; i < riders.length; i++) {
    let curRider = riders[i]
    let distance = getDistance(order.storeLng, order.storeLat, curRider.lng, curRider.lat)
    if (distance < min) {
      min = distance
      minIndex = i
    }
  }
  return riders[minIndex]
}
