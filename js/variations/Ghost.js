/**
 * Panic buttons at the side of the road?
 * (There's other stuff alongside the highway)
 * Eco/litter pickup zones
 * Roadkill ghosts?
 * Double-die and get respawned back onto the road (fade out?)
 * Car cemetery along the sides of the road -- and maybe another road further across
 * (Another variation: Autobahn?)
 */

class Ghost extends Racer {
    constructor(config) {
        super({
            key: `ghost`
        });
    }

    create() {
        super.create();

        // Player is a ghost so they're transparent
        this.player.setAlpha(0.25);

        // Follow the player with the camera
        this.cameras.main.setDeadzone(this.width - this.laneWidth, this.height);
        this.cameras.main.startFollow(this.player, true, 1, 1, 0, this.player.y / 2 - this.player.displayHeight / 2);
    }

    // Override setupCrashes so we no longer detect them
    // because they are a ghost
    setupCrashes() {

    }

    // Override move legality to let them off the road
    // because they are a ghost
    isIllegalMove(direction) {
        return (this.player.tween || this.player.crashed);
    }
}