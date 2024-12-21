function numTeams(rating) {
    const n = rating.length;
    if (n < 3) return 0;

    let result = 0;

    // 遍历每个士兵，计算左侧和右侧的比当前评分小和大的士兵数量
    for (let j = 0; j < n; j++) {
        let leftLess = 0, leftMore = 0;
        let rightLess = 0, rightMore = 0;

        for (let i = 0; i < j; i++) {
            if (rating[i] < rating[j]) leftLess++;
            if (rating[i] > rating[j]) leftMore++;
        }

        for (let k = j + 1; k < n; k++) {
            if (rating[k] < rating[j]) rightLess++;
            if (rating[k] > rating[j]) rightMore++;
        }
        // 计算满足条件的三元组数量
        result += leftLess * rightMore + leftMore * rightLess;
    }

    return result;
}

let rating = [2, 5, 3, 4, 1];
numTeams(rating);


