function canCompleteCircuit(gas, cost) {
    let total_tank = 0;
    let curr_tank = 0;
    let start_station = 0;
    
    for (let i = 0; i < gas.length; i++) {
        total_tank += gas[i] - cost[i];
        curr_tank += gas[i] - cost[i];
        
        if (curr_tank < 0) {
            start_station = i + 1;
            curr_tank = 0;
        }
    }
    
    return total_tank >= 0 ? start_station : -1;
}




function canCompleteCircuit(gas, cost) {
    let total_tank = 0;
    let curr_tank = 0;
    let start_station = 0;
    
    for (let i = 0; i < gas.length; i++) {
        total_tank += gas[i] - cost[i];
        curr_tank += gas[i] - cost[i];
        
        // If one couldn't get here
        if (curr_tank < 0) {
            // Pick up the next station as the starting one
            start_station = i + 1;
            // Start with an empty tank
            curr_tank = 0;
        }
    }
    
    return total_tank >= 0 ? start_station : -1;
}