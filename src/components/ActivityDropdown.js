import React from "react";

function ActivityDropdown({activity}){
    console.log(activity)
    const {activity_name, price, timeslotArray} = activity;

    return(
        <h1>{activity_name}
        <div>{timeslotArray}
        </div></h1>
    )

    

}

export default ActivityDropdown;