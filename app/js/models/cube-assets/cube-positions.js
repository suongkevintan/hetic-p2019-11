export class CubePositions {
    constructor() {
        this.list = [
            {
                name : 'roll',
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0,
                }
            }, {
              name : 'glide',

                rotation: {
                    y: 1.5,
                    x: 0,
                    z: 0
                }
            }, {
              name : 'flip',

                rotation: {
                    y: 0,
                    x: 1.5,
                    z: 0
                }
            }, {
              name : 'breathe',

                rotation: {
                    x: 0,
                    y: -1.5,
                    z: 0
                }
            }, {
              name : 'click',

                rotation: {
                    x: -1.5,
                    y: 0,
                    z: 0
                }

            }, {
              name : 'spin',

                rotation: {
                    x: 3,
                    y: -0,
                    z: 0
                }
            }, {
              name : 'roll',

                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }
        ];

        return this.list;
    }

}
