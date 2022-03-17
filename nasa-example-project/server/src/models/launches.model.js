const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer ISI1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customer: ["NASA", "SpaceX"],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(newLaunch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(newLaunch, {
            flightNumber: latestFlightNumber,
            customer: ["NASA", "SpaceX"],
            upcoming: true,
            success: true,
        })
    );
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;

    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
};
