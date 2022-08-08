import React from "react";
import ActivityDropdown from "./ActivityDropdown";

const Header = ({activities}) => {
    const displayActivities = activities.map((eachActivity) => (
        <ActivityDropdown
        key={eachActivity.id}
        activity={eachActivity}
        />
    ))

        return <h1>{displayActivities}</h1>
}

export default Header;