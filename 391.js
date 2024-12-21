function isRectangleCover(rectangles) {
    if (!rectangles || rectangles.length === 0) {
        return false;
    }

    let points = new Set();
    let totalArea = 0;

    for (let rect of rectangles) {
        let [x1, y1, x2, y2] = rect;
        totalArea += (x2 - x1) * (y2 - y1);

        let rectPoints = [
            `${x1},${y1}`,
            `${x2},${y1}`,
            `${x1},${y2}`,
            `${x2},${y2}`
        ];

        for (let point of rectPoints) {
            if (points.has(point)) {
                points.delete(point);
            } else {
                points.add(point);
            }
        }
    }

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (let point of points) {
        let [x, y] = point.split(',').map(Number);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }

    let expectedArea = (maxX - minX) * (maxY - minY);

    return totalArea === expectedArea && points.size === 4;
}