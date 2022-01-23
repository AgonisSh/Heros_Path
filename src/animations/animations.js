
export default function lesAnimations(scene) {

    // LA Création des différentes animations :
    scene.anims.create({
        key: 'idleRPlayer',
        frames: [
            { key: 'player', frame:"knight_m_idle_anim_f0.png" },
            { key: 'player', frame:"knight_m_idle_anim_f1.png" },
            { key: 'player', frame:"knight_m_idle_anim_f2.png" },
            { key: 'player', frame:"knight_m_idle_anim_f3.png" },
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'idleLPlayer',
        frames: [
            { key: 'player', frame:"knight_m_idle_anim_f0L.png" },
            { key: 'player', frame:"knight_m_idle_anim_f1L.png" },
            { key: 'player', frame:"knight_m_idle_anim_f2L.png" },
            { key: 'player', frame:"knight_m_idle_anim_f3L.png" },
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'runRPlayer',
        frames: [
            { key: 'player', frame:"knight_m_run_anim_f0.png" },
            { key: 'player', frame:"knight_m_run_anim_f1.png" },
            { key: 'player', frame:"knight_m_run_anim_f2.png" },
            { key: 'player', frame:"knight_m_run_anim_f3.png" },
        ],
        frameRate: 16,
        repeat: -1
    });

    scene.anims.create({
        key: 'runLPlayer',
        frames: [
            { key: 'player', frame:"knight_m_run_anim_f0L.png" },
            { key: 'player', frame:"knight_m_run_anim_f1L.png" },
            { key: 'player', frame:"knight_m_run_anim_f2L.png" },
            { key: 'player', frame:"knight_m_run_anim_f3L.png" },
        ],
        frameRate: 16,
        repeat: -1
    });


    scene.anims.create({
        key: 'idleROgre',
        frames: [
            { key: 'ogre', frame:"ogre_idle_anim_f0.png" },
            { key: 'ogre', frame:"ogre_idle_anim_f1.png" },
            { key: 'ogre', frame:"ogre_idle_anim_f2.png" },
            { key: 'ogre', frame:"ogre_idle_anim_f3.png" },
        ],
        frameRate: 6,
        repeat: -1
    });


    scene.anims.create({
        key: 'idleLOgre',
        frames: [
            { key: 'ogre', frame:"ogre_idle_anim_f0G.png" },
            { key: 'ogre', frame:"ogre_idle_anim_f1G.png" },
            { key: 'ogre', frame:"ogre_idle_anim_f2G.png" },
            { key: 'ogre', frame:"ogre_idle_anim_f3G.png" },
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'runROgre',
        frames: [
            { key: 'ogre', frame:"ogre_run_anim_f0.png" },
            { key: 'ogre', frame:"ogre_run_anim_f1.png" },
            { key: 'ogre', frame:"ogre_run_anim_f2.png" },
            { key: 'ogre', frame:"ogre_run_anim_f3.png" },
        ],
        frameRate: 16,
        repeat: -1
    });

    scene.anims.create({
        key: 'runLOgre',
        frames: [
            { key: 'ogre', frame:"ogre_run_anim_f0G.png" },
            { key: 'ogre', frame:"ogre_run_anim_f1G.png" },
            { key: 'ogre', frame:"ogre_run_anim_f2G.png" },
            { key: 'ogre', frame:"ogre_run_anim_f3G.png" },
        ],
        frameRate: 16,
        repeat: -1
    });

    //-----

    scene.anims.create({
        key: 'idleRDemon',
        frames: [
            { key: 'demon', frame:"demon_idle_anim_f0.png" },
            { key: 'demon', frame:"demon_idle_anim_f1.png" },
            { key: 'demon', frame:"demon_idle_anim_f2.png" },
            { key: 'demon', frame:"demon_idle_anim_f3.png" },
        ],
        frameRate: 6,
        repeat: -1
    });


    scene.anims.create({
        key: 'idleLDemon',
        frames: [
            { key: 'demon', frame:"demon_idle_anim_f0G.png" },
            { key: 'demon', frame:"demon_idle_anim_f1G.png" },
            { key: 'demon', frame:"demon_idle_anim_f2G.png" },
            { key: 'demon', frame:"demon_idle_anim_f3G.png" },
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'runRDemon',
        frames: [
            { key: 'demon', frame:"demon_run_anim_f0.png" },
            { key: 'demon', frame:"demon_run_anim_f1.png" },
            { key: 'demon', frame:"demon_run_anim_f2.png" },
            { key: 'demon', frame:"demon_run_anim_f3.png" },
        ],
        frameRate: 16,
        repeat: -1
    });

    scene.anims.create({
        key: 'runLDemon',
        frames: [
            { key: 'demon', frame:"demon_run_anim_f0G.png" },
            { key: 'demon', frame:"demon_run_anim_f1G.png" },
            { key: 'demon', frame:"demon_run_anim_f2G.png" },
            { key: 'demon', frame:"demon_run_anim_f3G.png" },
        ],
        frameRate: 16,
        repeat: -1
    });

}