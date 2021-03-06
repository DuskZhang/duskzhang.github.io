class TearBullet {
    constructor(x, y, target, damage) {
        this.position = createVector(x, y);
        this.target = target;
        this.damage = damage;
        this.speed = 5;
        this.image = tear;
        this.iam;
        this.dir;
        this.reachedTarget = false;

    }

    show() {
        image(this.image, this.position.x, this.position.y, 30, 30);
    }


    //ss
    //also have the hit function built in or make it separate ,,,, called at 60fps
    move(i) {
        //movement

        if (this.target == null) {
            bullets.splice(this.iam, 1);
        }
        this.dir = p5.Vector.sub(this.target.pector, this.position);
        this.dir = this.dir.mult(this.speed / this.dir.mag());
        if (this.target.hp <= 0) {
            bullets.splice(this.iam, 1);
        }

        if ((this.position.dist(this.target.pector)) <= 15) {
            //hit
            this.iam = i;
            this.target.hp -= this.damage;
            bullets.splice(this.iam, 1);
        } else {
            this.position.add(this.dir);
        }

    }
}

class WonkaBar {
    constructor(x, y, target, poison) {
        this.position = createVector(x, y);
        this.target = target;
        this.damage = 1;
        this.speed = 8;
        this.image = wonkabar;
        this.iam;
        this.dir;
        this.reachedTarget = false;
        this.poison = poison;

    }

    show() {
        if (this.target != null) {
            image(this.image, this.position.x, this.position.y, 30, 30);
        }
    }

    //also have the hit function built in or make it separate ,,,, called at 60fps
    move(i) {
        this.iam = i;
        //movement
        this.dir = p5.Vector.sub(this.target.pector, this.position);
        this.dir = this.dir.mult(this.speed / this.dir.mag());
        if (this.target.hp <= 0) {
            bullets.splice(this.iam, 1);
        }
        if (this.target == null) {
            bullets.splice(this.iam, 1);
        }
        if ((this.position.dist(this.target.pector)) <= 15) {
            //hit
            if (this.target.speed > 0.6) {
                this.target.speed = this.target.speed -= 0.3;
            }
            this.target.poisoned += this.poison;
            this.target.hp -= this.damage;
            bullets.splice(this.iam, 1);
        } else {
            this.position.add(this.dir);
            if (this.target.pector == null) {
                bullets.splice(this.iam, 1);
            }
        }

    }
}

class Brushy {
    constructor(target, poison, damage) {
        this.target = target;
        this.damage = damage;
        this.speed = 8;
        this.image = paintattack;
        this.iam;
        this.dir;
        this.reachedTarget = false;
        this.poison = poison;
        this.duration = 10;
    }

    show() {
        if (this.target != null) {
            image(this.image, this.target.pector.x, this.target.pector.y, 30, 30);
        }
    }

    //also have the hit function built in or make it separate ,,,, called at 60fps
    move(i) {
        this.iam = i;
        //hit slow
        if (this.target.speed > 1.2) {
            this.target.speed -= this.poison;
        }
        this.target.poisoned += this.poison;
        this.target.hp -= this.damage;
        bullets.splice(this.iam, 1);
    }
}

//exploding bitcoin technology damage  btc will be high volatile damage, might heal the enemy actually. -1 - 30 damage

class SpongebobMeme {
    constructor(x, y, target, what) {
        this.x = x;
        this.y = y;
        this.position = createVector(this.x, this.y);
        this.target = target;
        this.what = what;
        this.speed = 4;
        this.image = bobross;
        this.iam;
        this.dir;
        this.reachedTarget = false;
        this.damage;
    }

    //cange based on what

    show() {
        if (this.target != null) {
            image(this.image, this.position.x, this.position.y, 70, 70);
        }
    }

    //also have the hit function built in or make it separate ,,,, called at 60fps
    move(i) {
        this.image = memes[this.what - 1];
        this.damage = this.what + 3;

        this.dir = p5.Vector.sub(this.target.pector, this.position);
        this.dir = this.dir.mult(this.speed / this.dir.mag());

        if ((this.position.dist(this.target.pector)) <= 15) {
            //hit
            this.target.hp -= this.damage;
            bullets.splice(this.iam, 1);
        } else {
            this.position.add(this.dir);
            if (this.target.pector == null) {
                bullets.splice(this.iam, 1);
            }
        }


        this.iam = i;

    }
}

class BitcoinFire {
    constructor(x, y, damage) {
        this.x = x;
        this.y = y;
        this.position = createVector(this.x, this.y);
        this.target = null;
        this.speed = 1;
        this.image = bitcoins;
        this.iam;
        this.dir;
        this.reachedTarget = false;
        this.damage = damage;
    }

    //cange based on what

    show() {
        image(this.image, this.position.x, this.position.y, 40, 40);
        textSize(23);
        text(floor(this.damage), this.position.x, this.position.y);
    }
    //also have the hit function built in or make it separate ,,,, called at 60fps
    
    move(i) {
        // if this 
        if (muscles.length > 0) {
            if (frameCount % 60 == 0){
                this.damage = this.damage * 1.2 + 3;
                this.speed += 0.5;
            }
            
            //get a new target
            if (this.target == null) {
                var j = 0;
                for (j = 0; j < muscles.length; j++) {
                    if(muscles[j].hp>=0 && muscles[j].nodeIndex <= nodes.length ){
                       this.target = muscles[j];
                       break;
                    }
                }
            } else if(this.target.hp<= 0 || this.target.nodeIndex <= nodes.length) {
                var j = 0;
                for (j = 0; j < muscles.length; j++) {
                    if(muscles[j].hp>=0 && muscles[j].nodeIndex <= nodes.length ){
                       this.target = muscles[j];
                       break;
                    }
                }
            }
            
            //if target is valid
            if (this.target != null) {
                if(this.target.hp >= 0 && this.target.nodeIndex <= nodes.length) {
                    this.dir = p5.Vector.sub(this.target.pector, this.position);
                    this.dir = this.dir.mult(this.speed / this.dir.mag());
                    if ((this.position.dist(this.target.pector)) <= 20) {
                        this.target.hp -= this.damage;
                        if (this.target.hp <= 0) {
                            bitcoinWaveDamage += 0.20;
                        }
                        print("target hit");
                        bullets.splice(i, 1);
                    } else if (this.target.pector != null) {
                        if(this.target.pector.x >= 0 && this.target.pector.x <= 1080) {
                            if (this.target.pector.y >= 0 && this.target.pector.y <=720) {
                                print(this.dir.mag()); // brute force checking if the speed is too insane
                                if(this.dir.mag() <= 100) {
                                    this.position.add(this.dir);
                                }
                            }
                        }

                    }
                }
            }   
        //no valid targets
        } else {
            bullets.splice(i,1)
        }
            
    }    
}

class Sanicbomb {
    constructor(x, y, target, damage) {
        this.x = x;
        this.y = y;
        this.position = createVector(this.x, this.y);
        this.target = target;
        this.speed = 8;
        this.image = rings;
        this.iam;
        this.dir;
        this.reachedTarget = false;
        this.damage = 4.5;
        //shrapnel
    }

    show() {
        if (this.target != null) {
            image(this.image, this.position.x, this.position.y, 55, 55);
        }
    }

    //also have the hit function built in or make it separate ,,,, called at 60fps
    move(i) {


        this.dir = p5.Vector.sub(this.target.pector, this.position);
        this.dir = this.dir.mult(this.speed / this.dir.mag());

        if ((this.position.dist(this.target.pector)) <= 15) {
            //hit
            this.target.hp -= this.damage;
            bullets.splice(this.iam, 1);
        } else {
            this.position.add(this.dir);
            if (this.target.pector == null) {
                bullets.splice(this.iam, 1);
            }
        }


        this.iam = i;

    }
}

class MindBlown {
    constructor(x, y, target, damage) {
        this.x = x;
        this.y = y;
        this.position = createVector(this.x, this.y);
        this.target = target;
        this.speed = 3;
        this.image = mindblown;
        this.iam;
        this.dir;
        this.reachedTarget = false;
        this.damage = 7;
        //shrapnel
        this.shrapnelRange = 105;
        this.shrapnelDamage = 4;
    }

    show() {
        if (this.target != null) {
            image(this.image, this.position.x, this.position.y, 55, 55);
        }
    }

    //also have the hit function built in or make it separate ,,,, called at 60fps
    move(i) {


        this.dir = p5.Vector.sub(this.target.pector, this.position);
        this.dir = this.dir.mult(this.speed / this.dir.mag());

        if ((this.position.dist(this.target.pector)) <= 15) {
            //hit
            this.target.hp -= this.damage;

            for (let i = 0; i < muscles.length - 1; i++) {
                if ((this.position.dist(muscles[i].pector)) <= this.shrapnelRange) {
                    muscles[i].hp -= this.shrapnelDamage;
                }
            }

            bullets.splice(this.iam, 1);
        } else {
            this.position.add(this.dir);
            if (this.target.pector == null) {
                bullets.splice(this.iam, 1);
            }
        }


        this.iam = i;

    }
}

//exploding bitcoin technology damage  btc will be high volatile damage, might heal the enemy actually. -1 - 30 damage
