/**
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var getResults = function(queries) {
    const ans = [];
    const distance = { 0: 0 };
    const positions = [0];
    
    const findPreviousIndex = (positions, x) => {
        let left = 0;
        let right = positions.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (positions[mid] > x) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return Math.max(0, left - 1);
    };
    
    const findInsertIndex = (positions, x) => {
        let left = 0;
        let right = positions.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (positions[mid] > x) {
                right = mid;
            } else if (positions[mid] < x) {
                left = mid + 1;
            } else {
                return mid;
            }
        }
        return left;
    };
    
    for (const query of queries) {
        if (query[0] === 1) {
            const x = query[1];
            const prevIndex = findPreviousIndex(positions, x);
            const prevPos = positions[prevIndex];
            positions.splice(findInsertIndex(positions, x), 0, x);
            distance[x] = Math.max(x - prevPos, distance[prevPos]);
            
            let curIndex = positions.indexOf(x) + 1;
            while (curIndex < positions.length) {
                const curPos = positions[curIndex];
                const prevPos = positions[curIndex - 1];
                const oldDistance = distance[curPos];
                
                distance[curPos] = Math.max(
                    distance[prevPos],
                    curPos - prevPos
                );
                
                if (oldDistance === distance[curPos]) break;
                curIndex++;
            }
        } else {
            const x = query[1];
            const prevIndex = findPreviousIndex(positions, x);
            const prevPos = positions[prevIndex];
            ans.push(query[2] <= Math.max(x - prevPos, distance[prevPos]));
        }
    }
    
    return ans;
};