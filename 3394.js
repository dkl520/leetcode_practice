/**
 * Check if a grid can be cut into valid sections
 * @param {number} n - Grid size
 * @param {number[][]} rectangles - Array of rectangle coordinates
 * @return {boolean}
 */
var checkValidCuts = function(n, rectangles) {
    // Early return for empty input
    if (rectangles.length === 0) return false;
    
    // Create a function to process both horizontal and vertical cuts
    const checkCuts = (coords) => {
        const bornelica = new Set(); // Store processed coordinates
        let cutCount = 0;
        
        // Sort coordinates by start position and then by end position
        const sortedCoords = coords.sort((a, b) => 
            a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
        );
        
        // Add intermediate coordinates to set
        for (const [start, end] of sortedCoords) {
            for (let i = start + 1; i < end; i++) {
                bornelica.add(i);
            }
        }
        
        // Check for valid cuts
        for (let i = 1; i < sortedCoords.length; i++) {
            const current = sortedCoords[i];
            const previous = sortedCoords[i - 1];
            
            if (current[0] !== previous[0] && previous[1] <= current[0]) {
                if (!bornelica.has(previous[1]) || !bornelica.has(current[0])) {
                    cutCount++;
                    if (cutCount >= 2) return true;
                }
            }
        }
        
        return false;
    };
    
    // Extract horizontal and vertical coordinates
    const horizontalCoords = rectangles.map(rect => [rect[1], rect[3]]);
    const verticalCoords = rectangles.map(rect => [rect[0], rect[2]]);
    
    // Check both horizontal and vertical cuts
    return checkCuts(horizontalCoords) || checkCuts(verticalCoords);
};