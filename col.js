const t=["#FD0006","#FD6367","#FD393E","#C30005","#990004","#FF7F00","#FFB163","#FF9B39","#C56200","#9B4D00","#00B64F","#4EC883","#2ABA69","#008C3D","#006E30","#FFC500","#FFDB63","#FFD239","#C59800","#9B7700"],i=["#FDA7A9","#FEDCDD","#FEC3C4","#EA7F81","#CD5558","#FFD3A8","#FFEEDD","#FFE1C4","#ECB680","#CF9256","#7DBD99","#C5E4D2","#A1D2B6","#5BA97D","#3D9363","#FFEBA8","#FFF7DD","#FFF1C4","#ECD380","#CFB356"];class s{constructor(t){this.id=t,this.rank=0,this.parent=this}}class n{constructor(){this.nodes=[]}findNode(t){if(void 0===this.nodes[t])return this.nodes[t]=new s(t),this.nodes[t];{let i=this.nodes[t];for(;i.id!==i.parent.id;)i=i.parent;return i}}find(t){return this.findNode(t).id}union(t,i){const s=this.findNode(t),n=this.findNode(i);s.id!==n.id&&(s.rank<n.rank?s.parent=n:s.rank>n.rank?n.parent=s:(n.parent=s,s.rank++))}}class e{constructor(t,i){this.x=t,this.y=i}set(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}subtract(t){return this.x-=t.x,this.y-=t.y,this}scale(t){return this.x*=t,this.y*=t,this}rotate(t){const i=Math.cos(t),s=Math.sin(t),n=this.x*i-this.y*s,e=this.x*s+this.y*i;return this.x=n,this.y=e,this}normalize(){const t=this.length();return t>0&&1!==t&&this.scale(1/t),this}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}distanceFrom(t){const i=this.x-t.x,s=this.y-t.y;return e.length(i,s)}clear(){this.x=0,this.y=0}toString(){return this.x+", "+this.y}static cross(t,i,s,n){return t*n-i*s}static dot(t,i,s,n){return t*s+i*n}static length(t,i){return Math.sqrt(t*t+i*i)}static angle(t,i){let s=Math.atan2(i,t);return s<0&&(s+=2*Math.PI),s}}class o{constructor(t){this.restitution=t,this.collisionPoints=[]}merge(t){for(const i of t.collisionPoints)this.collisionPoints.push(i)}apply(){const t=this.collisionPoints.length,i=[],s=[];let n=0,o=0,r=Number.MAX_VALUE;do{o>0&&(r=o),o=0;for(let r=0;r<t;r++){const t=this.collisionPoints[r],h=t.collidingEntity.velocity,c=t.collidingEntity.angularVelocity,a=t.impactedEntity.velocity,l=t.impactedEntity.angularVelocity,d=t.collidingEntity.origin,g=t.contactPointX-d.x,u=t.contactPointY-d.y,x=t.impactedEntity.origin,m=t.contactPointX-x.x,y=t.contactPointY-x.y,f=t.getNormalMass();let w=-c*u,p=c*g;w-=-l*y,p-=l*m,w-=a.x,p-=a.y,w+=h.x,p+=h.y,0===n&&(i[r]=w*this.restitution,s[r]=p*this.restitution);let v=(e.dot(i[r],s[r],t.normalX,t.normalY)+e.dot(w,p,t.normalX,t.normalY))*f*-1;const M=t.accumulatedImpulse;t.accumulatedImpulse=Math.max(t.accumulatedImpulse+v,0),v=t.accumulatedImpulse-M,o+=Math.abs(v);const T=t.normalX*v,S=t.normalY*v,B=t.collidingEntity.invertedMass(),Y=T*B,X=S*B,F=t.collidingEntity.invertedInertia()*e.cross(g,u,T,S),P=t.impactedEntity.invertedMass();let D=T*P,E=S*P;D=-D,E=-E;const C=-t.impactedEntity.invertedInertia()*e.cross(m,y,T,S);t.addTempVelocities(Y,X,F,D,E,C)}for(let i=0;i<t;i++)this.collisionPoints[i].applyTempVelocities();n++}while(o>.001&&n<50&&o<=r)}static mergeCollisions(t){if(t.length<=1)return t;const i=new n;for(const s of t){const t=s.collisionPoints[0];i.union(t.collidingEntity.id,t.impactedEntity.id)}const s=[];for(const n of t){const t=n.collisionPoints[0],e=i.find(t.collidingEntity.id);void 0===s[e]?s[e]=n:s[e].merge(n)}const e=[];for(const t in s)e.push(s[t]);return e}}class r{constructor(t,i,s,n,o,r,h){this.collidingEntity=t,this.impactedEntity=i,this.normalX=s,this.normalY=n,this.contactPointX=o,this.contactPointY=r,this.separation=h,this.accumulatedImpulse=0,this.nv1=new e(0,0),this.nw1=0,this.nv2=new e(0,0),this.nw2=0}getNormalMass(){const t=this.collidingEntity.origin,i=t.x-this.contactPointX,s=t.y-this.contactPointY,n=this.impactedEntity.origin,o=n.x-this.contactPointX,r=n.y-this.contactPointY;let h=e.cross(i,s,this.normalX,this.normalY);h*=h;let c=e.cross(o,r,this.normalX,this.normalY);return c*=c,1/(this.collidingEntity.invertedMass()+this.impactedEntity.invertedMass()+h*this.collidingEntity.invertedInertia()+c*this.impactedEntity.invertedInertia())}addTempVelocities(t,i,s,n,e,o){this.nv1.x+=t,this.nv1.y+=i,this.nw1+=s,this.nv2.x+=n,this.nv2.y+=e,this.nw2+=o}applyTempVelocities(){this.collidingEntity.addVelocity(this.nv1),this.collidingEntity.addAngularVelocity(this.nw1),this.impactedEntity.addVelocity(this.nv2),this.impactedEntity.addAngularVelocity(this.nw2),this.nv1.clear(),this.nw1=0,this.nv2.clear(),this.nw2=0}}class h{constructor(t){this.id=t,this.origin=new e(0,0),this.angle=0,this.dimension=new e(.1,.1),this.mass=1,this.velocity=new e(0,0),this.angularVelocity=0,this.lateralFriction=1,this.rotationalFriction=1,this.force=new e(0,0),this.angularForce=0,this.target=new e(0,0),this.targetSet=!1,this.thrust=2,this.targetAngle=0,this.targetAngleSet=!1,this.angleThrust=.02,this.cornerX=[0,0,0,0],this.cornerY=[0,0,0,0]}finalize(){return this.inertia=(this.dimension.x*this.dimension.x+this.dimension.y*this.dimension.y)*this.mass/12,this.calculateCorners(),this}setOrigin(t,i){return this.origin.x=t,this.origin.y=i,this}setAngle(t){return this.angle=t,this}setDimension(t,i){return this.dimension.x=t,this.dimension.y=i,this}setMass(t){return this.mass=t,this}setVelocity(t,i){return this.velocity.x=t,this.velocity.y=i,this}setAngularVelocity(t){return this.angularVelocity=t,this}setForce(t,i){return this.force.x=t,this.force.y=i,this}setAngularForce(t){return this.angularForce=t,this}setTarget(t,i){return this.target.x=t,this.target.y=i,this.targetSet=!0,this}setTargetAngle(t){return this.targetAngle=t,this.targetAngleSet=!0,this}advance(t){this.origin.x+=this.velocity.x*t,this.origin.y+=this.velocity.y*t,this.angle+=this.angularVelocity*t,this.angle>Math.Pi?this.angle-=2*Math.Pi:this.angle<-Math.Pi&&(this.angle+=2*Math.Pi),this.calculateCorners()}applyForces(t){if(this.targetSet){let i=this.target.x-this.origin.x,s=this.target.y-this.origin.y;const n=e.length(i,s);n>0&&(i*=this.thrust/n,s*=this.thrust/n,this.velocity.x+=i*t*this.invertedMass(),this.velocity.y+=s*t*this.invertedMass())}else this.velocity.x+=this.force.x*t*this.invertedMass(),this.velocity.y+=this.force.y*t*this.invertedMass();if(this.targetAngleSet){let i=this.targetAngle-this.angle;0!==i&&(i=this.angleThrust*Math.sign(i),this.angularVelocity+=i*t*this.invertedInertia())}else this.angularVelocity+=this.angularForce*t*this.invertedInertia();this.velocity.scale(Math.max(0,1-t*this.lateralFriction)),this.angularVelocity*=Math.max(0,1-t*this.rotationalFriction)}calculateCorners(){const t=Math.sin(this.angle),i=Math.cos(this.angle),s=-t,n=i;this.cornerX[0]=this.origin.x+i*this.dimension.x*.5+s*this.dimension.y*.5,this.cornerY[0]=this.origin.y+t*this.dimension.x*.5+n*this.dimension.y*.5,this.cornerX[1]=this.origin.x-i*this.dimension.x*.5+s*this.dimension.y*.5,this.cornerY[1]=this.origin.y-t*this.dimension.x*.5+n*this.dimension.y*.5,this.cornerX[2]=this.origin.x-i*this.dimension.x*.5-s*this.dimension.y*.5,this.cornerY[2]=this.origin.y-t*this.dimension.x*.5-n*this.dimension.y*.5,this.cornerX[3]=this.origin.x+i*this.dimension.x*.5-s*this.dimension.y*.5,this.cornerY[3]=this.origin.y+t*this.dimension.x*.5-n*this.dimension.y*.5}invertedMass(){return this.isFixedBody()?0:1/this.mass}invertedInertia(){return this.isFixedBody()||0===this.inertia?0:1/this.inertia}isFixedBody(){return-1===this.mass}addVelocity(t){this.velocity.add(t)}addAngularVelocity(t){this.angularVelocity+=t}collide(t,i,s){const n=new o(s);return this.collideAllCorners(n,t,i),n.collisionPoints.length<2&&t.collideAllCorners(n,this,i),0===n.collisionPoints.length?null:n}collideAllCorners(t,i,s){for(let n=0;n<4;n++)this.collideSingleCorner(t,i,n,s)}collideSingleCorner(t,i,s,n){const o=1e-5,h=i.cornerX[s],c=i.cornerY[s];let a=h-this.origin.x,l=c-this.origin.y;const d=Math.cos(-this.angle),g=Math.sin(-this.angle),u=a*g+l*d;a=a*d-l*g,l=u;const x=.5*this.dimension.x,m=.5*this.dimension.y;if(a>=-x-o&&a<=x+o&&l>=-m-o&&l<=m+o){const s=i.velocity,o=i.angularVelocity,d=this.velocity,g=this.angularVelocity,u=h-i.origin.x,y=c-i.origin.y,f=h-this.origin.x,w=c-this.origin.y;let p=-o*y,v=o*u;p-=-g*w,v-=g*f,p-=d.x,v-=d.y,p+=s.x,v+=s.y;let M=p*n,T=v*n;const S=Math.cos(-this.angle),B=Math.sin(-this.angle),Y=M*B+T*S;M=M*S-T*B,T=Y;let X,F,P=m-l,D=P,E=0,C=0;if(P<-T&&(E=1),P=x+a,P<M&&(E|=2),P<D&&(D=P,C=1),P=m+l,P<T&&(E|=4),P<D&&(D=P,C=2),P=x-a,P<-M&&(E|=8),P<D&&(D=P,C=3),E>0){let t=0;X=0,F=0;for(let i=0;i<4;i++)if((E&1<<i)>0){const s=i,n=3===s?0:s+1;let o=this.cornerX[s]-this.cornerX[n],r=this.cornerY[s]-this.cornerY[n];const h=1/e.length(o,r);o*=h,r*=h;const c=o;o=-r,r=c,X+=o,F+=r,t++}if(t>1){const t=e.length(X,F);X/=t,F/=t}}else{const t=C,i=3===t?0:t+1;let s=this.cornerX[t]-this.cornerX[i],n=this.cornerY[t]-this.cornerY[i];const o=1/e.length(s,n);s*=o,n*=o;const r=s;s=-n,n=r,X=s,F=n}const k=new r(i,this,X,F,h,c,D);t.collisionPoints.push(k)}}}class c extends h{constructor(t){super(t),this.lateralFriction=1.5,this.rotationalFriction=7.5,this.eyesDir=new e(-1,3)}}class a extends class{constructor(){this.start=0,this.previous=0,this.remainder=0,this.restitution=1}*getMovingBodies(){}*getFixedBodies(){}preAdvance(t){}postAdvance(t){}collideBodies(t,i){return!0}advance(t){this.preAdvance(t),0===this.start&&(this.start=t),0===this.previous&&(this.previous=t);let i=t-this.previous+this.remainder;for(;i>10;)this.advanceByTimestep(.01),i-=10;this.previous=t,this.remainder=i,this.postAdvance(t)}advanceByTimestep(t){const i=this.collide(t);for(const i of this.getMovingBodies())i.applyForces(t);for(const t of i)t.apply();for(const i of this.getMovingBodies())i.advance(t)}collide(t){const i=[],s=new Set;for(const n of this.getMovingBodies()){s.add(n.id);for(const e of this.getMovingBodies())if(!s.has(e.id)&&this.collideBodies(n,e)&&this.collideBodies(e,n)){const s=n.collide(e,t,this.restitution);null!==s&&i.push(s)}}for(const s of this.getFixedBodies())for(const n of this.getMovingBodies())if(this.collideBodies(s,n)&&this.collideBodies(n,s)){const e=s.collide(n,t,this.restitution);null!==e&&i.push(e)}return o.mergeCollisions(i)}}{constructor(){super(),this.restitution=.5,this.chicken=new c(0).setOrigin(.004*Math.random()-.002,.55).setDimension(.15,.15).setMass(1).setForce(0,-1.2).finalize(),this.landingBar=new h(1).setOrigin(0,-.1).setDimension(.07,.03).setMass(2).setTargetAngle(0).finalize(),this.landingBar.lateralFriction=1.5,this.landingBar.rotationalFriction=7.5,this.handle=new e(0,-.3),this.startTimeMs=0,this.runTimeSecs=0,this.lastJumpTimeMs=0,this.nextBugTimeSecs=Math.random()+1.5,this.runTimeStr="0.0",this.bugs=[],this.nextBugId=2,this.nextBodyId=0}*getMovingBodies(){yield this.chicken,yield this.landingBar,yield*this.bugs}*getFixedBodies(){}preAdvance(t){0===this.startTimeMs&&(this.startTimeMs=t);const i=new e(this.handle.x,this.handle.y).scale(.25);this.landingBar.setTarget(i.x,i.y)}postAdvance(t){this.nextBugTimeSecs<this.runTimeSecs&&this.addBug(),this.bugs=this.bugs.filter((function(t){return!a.outOfBounds(t)})),this.chicken.eyesDir.set(this.handle).subtract(this.chicken.origin);for(const t of this.bugs)t.eyesDir.set(this.chicken.origin);this.runTimeSecs=(t-this.startTimeMs)/1e3,this.runTimeStr=this.runTimeSecs.toFixed(1)}collideBodies(t,i){return 0===t.id||1!==i.id}addBug(){const t=Math.random()<.5?-.55:.55,i=.4*Math.random()-.2,s=new e(t,i),n=new e(this.chicken.origin.x,this.chicken.origin.y).subtract(s).normalize().scale(.4),o=new c(this.nextBugId++).setOrigin(t,i).setDimension(.1,.1).setMass(.5).setVelocity(n.x,n.y).setAngularVelocity(4*Math.random()+2).finalize();o.lateralFriction=0,o.rotationalFriction=0,this.bugs.push(o),this.nextBugTimeSecs=this.runTimeSecs+(Math.random()+1.5)}jump(t){const i=1.6*this.chicken.origin.distanceFrom(this.landingBar.origin),s=Date.now();if(i<this.chicken.dimension.y+this.landingBar.dimension.y&&s-this.lastJumpTimeMs>200){const i=6*Math.min(.3,Math.max(.2,t));this.chicken.velocity.y+=i,this.lastJumpTimeMs=s}}static outOfBounds(t){const i=t.dimension.x,s=t.dimension.y;return t.origin.x+i<-.5||t.origin.x-i>.5||t.origin.y+s<-.5}}class l{constructor(t){this.text=t,this.origin=new e(0,0),this.dimension=new e(.38,.11),this.isDown=!1}clicked(t){const i=t.x;return i>=this.origin.x-this.dimension.x/2&&i<=this.origin.x+this.dimension.x/2&&t.y>=this.origin.y-this.dimension.y/2&&t.y<=this.origin.y+this.dimension.y/2}down(t){const i=t.x;this.isDown=i>=this.origin.x-this.dimension.x/2&&i<=this.origin.x+this.dimension.x/2&&t.y>=this.origin.y-this.dimension.y/2&&t.y<=this.origin.y+this.dimension.y/2}up(t){this.isDown=!1}}class d{constructor(t){this.session=t}draw(){}onClick(t){return this}onMouseDown(t){}onMouseUp(t){}onMouseMove(t){}restartGame(){return this.session.gameState=new a,this.session.runGame(),new u(this.session)}}class g extends d{constructor(t){super(t),this.startButton=new l("Start"),this.startButton.origin.y=-.25}draw(){const i=new c(this).setOrigin(-.3,.15).setDimension(.2,.2).setAngle(.6*Math.random()-.3).finalize();this.session.graphics.drawGame(this.session,!1,!1),this.session.graphics.drawChicken(i,t),this.session.graphics.drawTextAlign("Chicken",-.14,.16,.13,"left"),this.session.graphics.drawTextAlign("On A Line",-.14,.05,.13,"left"),this.session.graphics.drawText("swipe to balance, click to jump, 2000 points to win",0,-.14,.035),this.session.graphics.drawButton(this.startButton)}onClick(t){return this.startButton.clicked(t)?(this.session.runGame(this.session),new u(this.session)):this}onMouseDown(t){this.startButton.down(t)}onMouseUp(t){this.startButton.up(t)}}class u extends d{constructor(t){super(t),this.before=0}draw(){this.session.graphics.drawGame(this.session,!0,!1)}onClick(t){return this}onMouseMove(t){return t.y>-.25&&(t.y=-.25),this.session.gameState.handle.set(t),this}onMouseDown(t){this.before=Date.now()}onMouseUp(t){const i=(Date.now()-this.before)/1e3;this.session.gameState.jump(i)}}class x extends d{constructor(t){super(t),this.dy=.15,this.session=t,this.newMultiplier=this.session.multiplier+1,this.resetButton=new l("1x Reset"),this.resetButton.origin.x=-.22,this.resetButton.origin.y=-.25,this.riskButton=new l(this.newMultiplier+"x Risk"),this.riskButton.origin.x=.22,this.riskButton.origin.y=-.25}draw(){this.session.graphics.drawGame(this.session,!0,!0),this.session.graphics.drawText("Good Round",0,this.dy-.08,.14),this.session.graphics.drawText("round's score "+this.session.roundScore,0,this.dy-.15,.05),this.session.graphics.drawButton(this.resetButton),this.session.graphics.drawButton(this.riskButton),this.session.graphics.drawText("Beat "+this.session.gameState.runTimeStr+"s or game over",.22,-.34,.03)}onClick(t){return this.resetButton.clicked(t)?(this.session.multiplier=1,this.session.lastRunTimeStr="0.0",this.restartGame()):this.riskButton.clicked(t)?(this.session.multiplier=this.session.multiplier+1,this.session.lastRunTimeStr=this.session.gameState.runTimeStr,this.restartGame()):this}onMouseDown(t){this.resetButton.down(t),this.riskButton.down(t)}onMouseUp(t){this.resetButton.up(t),this.riskButton.up(t)}}class m extends d{constructor(t,i,s){super(t),this.dy=.15,this.headline=s?"Chicken Dinner!":"Game Over",this.subline=i?"new highscore ":"final score ",this.startButton=new l("Start"),this.startButton.origin.y=-.25}draw(){this.session.graphics.drawGame(this.session,!0,!0),this.session.graphics.drawText(this.headline,0,this.dy-.08,.14),this.session.graphics.drawText(this.subline+this.session.score,0,this.dy-.15,.05),this.session.graphics.drawButton(this.startButton)}onClick(t){return this.startButton.clicked(t)?(this.session.lastRunTimeStr="0.0",this.session.roundScore=0,this.session.score=0,this.session.multiplier=1,this.restartGame()):this}onMouseDown(t){this.startButton.down(t)}onMouseUp(t){this.startButton.up(t)}onMouseMove(t){}}class y{constructor(t){this.gameState=new a,this.graphics=t,this.currentScreen=new g(this),this.isRunning=!1,this.lastRunTimeStr=0,this.roundScore=0,this.score=0,this.multiplier=1,this.highScore=0,this.currentScreen.draw()}runGame(){this.isRunning=!0;const t=this;window.requestAnimationFrame((function i(s){t.gameState.advance(s),t.drawGame(!0,!1),t.gameState.chicken.origin.y<-.5&&t.endGame(),t.isRunning&&window.requestAnimationFrame(i)}))}drawGame(t,i){this.graphics.drawGame(this,t,i)}endGame(){if(this.isRunning=!1,Number(this.gameState.runTimeStr)>Number(this.lastRunTimeStr)){this.roundScore=Math.round(10*this.multiplier*this.gameState.runTimeStr),this.score+=this.roundScore;const t=this.score>2e3;if(t){const i=this.score>this.highScore;i&&(this.highScore=this.score),this.currentScreen=new m(this,i,t)}else this.currentScreen=new x(this)}else{const t=this.score>this.highScore;t&&(this.highScore=this.score),this.currentScreen=new m(this,t,!1)}this.currentScreen.draw()}onClick(t){const i=this.graphics.toClickVector(t);this.currentScreen=this.currentScreen.onClick(i),this.redrawIfNotRunning()}onMouseDown(t){const i=this.graphics.toClickVector(t);this.currentScreen.onMouseDown(i),this.redrawIfNotRunning()}onMouseUp(t){const i=this.graphics.toClickVector(t);this.currentScreen.onMouseUp(i),this.redrawIfNotRunning()}onMouseMove(t){const i=this.graphics.toClickVector(t);this.currentScreen.onMouseMove(i)}redrawIfNotRunning(){this.isRunning||this.currentScreen.draw()}resizeCanvasInGame(){this.graphics.resizeCanvas(),this.isRunning||this.currentScreen.draw()}}class f{constructor(t){this.canvas=t,this.context=t.getContext("2d"),this.transformX=0,this.transformY=0,this.resizeCanvas()}resizeCanvas(){const t=window.innerWidth,i=window.innerHeight;this.canvas.width!==t&&(this.canvas.width=t,this.canvas.height=i),this.canvas.width>this.canvas.height?(this.transformX=this.canvas.height/1*1,this.transformY=this.canvas.height):(this.transformX=this.canvas.width,this.transformY=this.canvas.width/1*1)}drawGame(s,n,e){this.context.resetTransform(),this.context.fillStyle="#577B99",this.context.fillRect(0,0,this.canvas.width,this.canvas.height),this.setDrawTransform(),this.context.fillStyle="#C2D1DD",this.context.fillRect(-.5,-.5,1,1);const o=e?i:t;if(n){this.drawLine(s.gameState.landingBar,s.gameState.handle,o);for(const t of s.gameState.bugs)this.drawBug(t,o);this.drawTextAlign("score "+s.score,-.48,.445,.05,"left"),this.drawTextAlign("high score "+s.highScore,-.48,.405,.03,"left"),this.drawTextAlign("beat "+s.lastRunTimeStr+"s",.48,.445,.05,"right"),this.drawTextAlign("multiplier "+s.multiplier+"x",.48,.405,.03,"right"),this.drawText(s.gameState.runTimeStr+"s",0,.26,.1),this.drawChicken(s.gameState.chicken,o)}this.context.fillStyle="#577B99",this.context.fillRect(-1,-.5,2,-1),this.context.fillRect(-1,.5,2,1),this.context.fillRect(-.5,-1,-1,2),this.context.fillRect(.5,-1,1,2)}drawLine(t,s,n){const o=new e(0,0),r=.01,h=new e(t.cornerX[1],t.cornerY[1]),c=new e(t.cornerX[0],t.cornerY[0]);let a=new e(o.x,o.y).subtract(h);const l=a.length(),d=Math.asin(r/l);a.normalize().rotate(d).scale(Math.sqrt(l*l-r*r)).add(h);let g=new e(o.x,o.y).subtract(c);const u=g.length(),x=Math.asin(r/u);g.normalize().rotate(-x).scale(Math.sqrt(u*u-r*r)).add(c);let m=new e(s.x,s.y).subtract(h);const y=m.length(),f=Math.asin(.1/y);m.normalize().rotate(-f).scale(Math.sqrt(y*y-.1*.1)).add(h);let w=new e(s.x,s.y).subtract(c);const p=w.length(),v=Math.asin(.1/p);if(w.normalize().rotate(v).scale(Math.sqrt(p*p-.1*.1)).add(c),w.x<m.x){const t=w;w=m,m=t}if(g.x<a.x){const t=g;g=a,a=t}this.context.fillStyle="#fcf9de",this.context.beginPath(),this.context.arc(o.x,o.y,r,0,2*Math.PI,!1),this.context.fill(),this.context.fillStyle="#fcf9de",this.context.beginPath(),this.context.moveTo(a.x,a.y),this.context.lineTo(t.cornerX[1],t.cornerY[1]),this.context.lineTo(t.cornerX[0],t.cornerY[0]),this.context.lineTo(g.x,g.y),this.context.closePath(),this.context.fill(),this.context.fillStyle=i[7],this.context.beginPath(),this.context.moveTo(t.cornerX[1],t.cornerY[1]),this.context.lineTo(m.x,m.y),this.context.lineTo(w.x,w.y),this.context.lineTo(t.cornerX[0],t.cornerY[0]),this.context.closePath(),this.context.fill(),this.context.fillStyle="#fcf9de",this.context.beginPath(),this.context.arc(s.x,s.y,.1,0,2*Math.PI,!1),this.context.fill()}drawBug(t,i){this.context.fillStyle=i[2],this.context.beginPath(),this.context.moveTo(t.cornerX[0],t.cornerY[0]),this.context.lineTo(t.cornerX[1],t.cornerY[1]),this.context.lineTo(t.cornerX[2],t.cornerY[2]),this.context.lineTo(t.cornerX[3],t.cornerY[3]),this.context.closePath(),this.context.fill();const s=t.cornerX[0]+.5*(t.cornerX[1]-t.cornerX[0]),n=t.cornerY[0]+.5*(t.cornerY[1]-t.cornerY[0]),e=t.cornerX[2]+.5*(t.cornerX[3]-t.cornerX[2]),o=t.cornerY[2]+.5*(t.cornerY[3]-t.cornerY[2]);this.context.fillStyle=i[1],this.context.beginPath(),this.context.moveTo(s,n),this.context.lineTo(t.cornerX[1],t.cornerY[1]),this.context.lineTo(t.cornerX[2],t.cornerY[2]),this.context.lineTo(e,o),this.context.closePath(),this.context.fill();const r=.7*(s-t.origin.x),h=.7*(n-t.origin.y),c=t.origin.x+r,a=t.origin.y+h,l=t.cornerX[1]+.5*(t.cornerX[2]-t.cornerX[1]),d=t.cornerY[1]+.5*(t.cornerY[2]-t.cornerY[1]),g=t.cornerX[3]+.5*(t.cornerX[0]-t.cornerX[3]),u=t.cornerY[3]+.5*(t.cornerY[0]-t.cornerY[3]);this.context.fillStyle=i[3],this.context.beginPath(),this.context.moveTo(t.cornerX[0],t.cornerY[0]),this.context.lineTo(g+r,u+h),this.context.lineTo(l+r,d+h),this.context.lineTo(t.cornerX[1],t.cornerY[1]),this.context.closePath(),this.context.fill(),this.context.beginPath(),this.context.arc(c,a,t.dimension.x/2,t.angle-Math.PI,t.angle,!1),this.context.fill();const x=t.origin.x+.5*(t.cornerX[1]-t.origin.x),m=t.origin.y+.5*(t.cornerY[1]-t.origin.y),y=t.origin.x+.5*(t.cornerX[0]-t.origin.x),f=t.origin.y+.5*(t.cornerY[0]-t.origin.y),w=x+.14*(y-x),p=m+.14*(f-m),v=y+.14*(x-y),M=f+.14*(m-f);this.drawEyeWhite(t,w,p,.22*t.dimension.x),this.drawEyeWhite(t,v,M,.22*t.dimension.x),this.drawEyeRest(t,w,p,.22*t.dimension.x),this.drawEyeRest(t,v,M,.22*t.dimension.x)}drawChicken(t,i){this.context.fillStyle=i[6],this.context.beginPath(),this.context.moveTo(t.cornerX[0],t.cornerY[0]),this.context.lineTo(t.cornerX[1],t.cornerY[1]),this.context.lineTo(t.cornerX[2],t.cornerY[2]),this.context.lineTo(t.cornerX[3],t.cornerY[3]),this.context.closePath(),this.context.fill();const s=t.cornerX[0]+.5*(t.cornerX[3]-t.cornerX[0]),n=t.cornerY[0]+.5*(t.cornerY[3]-t.cornerY[0]),e=t.cornerX[1]+.5*(t.cornerX[2]-t.cornerX[1]),o=t.cornerY[1]+.5*(t.cornerY[2]-t.cornerY[1]),r=t.cornerX[2]+.5*(t.cornerX[3]-t.cornerX[2]),h=t.cornerY[2]+.5*(t.cornerY[3]-t.cornerY[2]);this.context.fillStyle=i[5],this.context.beginPath(),this.context.moveTo(s,n),this.context.lineTo(e,o),this.context.lineTo(r,h),this.context.closePath(),this.context.fill(),this.context.fillStyle=i[8],this.context.beginPath(),this.context.moveTo(s,n),this.context.lineTo(t.origin.x,t.origin.y),this.context.lineTo(r,h),this.context.closePath(),this.context.fill();const c=t.cornerX[0]+.5*(t.cornerX[1]-t.cornerX[0]),a=t.cornerY[0]+.5*(t.cornerY[1]-t.cornerY[0]),l=t.origin.x+1.4*(c-t.origin.x),d=t.origin.y+1.4*(a-t.origin.y);this.context.fillStyle=i[1],this.context.beginPath(),this.context.moveTo(t.cornerX[0],t.cornerY[0]),this.context.lineTo(t.cornerX[1],t.cornerY[1]),this.context.lineTo(l,d),this.context.closePath(),this.context.fill();const g=t.origin.x+.5*(t.cornerX[1]-t.origin.x),u=t.origin.y+.5*(t.cornerY[1]-t.origin.y),x=t.origin.x+.5*(t.cornerX[0]-t.origin.x),m=t.origin.y+.5*(t.cornerY[0]-t.origin.y),y=g+.14*(x-g),f=u+.14*(m-u),w=x+.14*(g-x),p=m+.14*(u-m);this.drawEyeWhite(t,y,f,.2*t.dimension.x),this.drawEyeWhite(t,w,p,.2*t.dimension.x),this.drawEyeRest(t,y,f,.2*t.dimension.x),this.drawEyeRest(t,w,p,.2*t.dimension.x)}drawEyeWhite(t,i,s,n){const e=n;this.context.fillStyle="#fcf9de",this.context.beginPath(),this.context.arc(i,s,e,0,2*Math.PI,!1),this.context.fill()}drawEyeRest(t,i,s,n){const o=n;this.context.fillStyle="#5f4808";const r=.6*o,h=new e(t.eyesDir.x,t.eyesDir.y);h.normalize().scale(.2*n),i+=h.x,s+=h.y,this.context.beginPath(),this.context.arc(i,s,r,0,2*Math.PI,!1),this.context.fill(),this.context.fillStyle="#fcf9de";const c=.2*o;i+=.2*n,s+=.2*n,this.context.beginPath(),this.context.arc(i,s,c,0,2*Math.PI,!1),this.context.fill()}drawButton(i){let s=i.origin.x-i.dimension.x/2,n=i.origin.y+i.dimension.y/2;const e=i.isDown?.02:0;this.context.fillStyle=t[8],this.context.beginPath(),this.context.moveTo(s,n),this.context.lineTo(s+i.dimension.x,n),this.context.lineTo(s+i.dimension.x,n-i.dimension.y),this.context.lineTo(s,n-i.dimension.y),this.context.closePath(),this.context.fill(),s+=e,n-=e,this.context.fillStyle=t[9],this.context.beginPath(),this.context.moveTo(s,n),this.context.lineTo(s+i.dimension.x-.02,n),this.context.lineTo(s+i.dimension.x-.02,n-i.dimension.y),this.context.lineTo(s,n-i.dimension.y),this.context.closePath(),this.context.fill(),this.drawTextAlignC(i.text,i.origin.x+e,i.origin.y-.22*i.dimension.y-e,.67*i.dimension.y,"center","#fcf9de")}drawText(t,i,s,n){this.drawTextAlign(t,i,s,n,"center")}drawTextAlign(t,i,s,n,e){this.drawTextAlignC(t,i,s,n,e,"#5f4808")}drawTextAlignC(t,i,s,n,e,o){this.context.setTransform(1/1.1,0,0,1,this.canvas.width/2,this.canvas.height/2);const r=this.transformY*n;this.context.fillStyle=o,this.context.font=r+"px Verdena, sans-serif",this.context.textAlign=e,this.context.fillText(t,i*this.transformY*1.1,-s*this.transformY),this.setDrawTransform()}setDrawTransform(){this.context.setTransform(this.transformX,0,0,-this.transformY,this.canvas.width/2,this.canvas.height/2)}x(t){return(t-this.canvas.width/2)/this.transformX}y(t){return-(t-this.canvas.height/2)/this.transformY}toClickVector(t){const i=this.canvas.getBoundingClientRect(),s=this.x(t.clientX-i.left),n=this.y(t.clientY-i.top);return new e(s,n)}}window.onload=function(){const t=document.getElementById("c"),i=new f(t),s=new y(i);window.addEventListener("resize",(function(t){s.resizeCanvasInGame()})),t.addEventListener("click",(function(t){s.onClick(t)})),t.addEventListener("mousedown",(function(t){s.onMouseDown(t)})),t.addEventListener("touchstart",(function(t){const i=t.touches[0];s.onMouseDown(i)})),t.addEventListener("mouseup",(function(t){s.onMouseUp(t)})),t.addEventListener("touchend",(function(t){const i=t.touches[0];s.onMouseUp(i)})),t.addEventListener("mousemove",(function(t){s.onMouseMove(t)})),t.addEventListener("touchmove",(function(t){t.preventDefault();const i=t.touches[0];s.onMouseMove(i)}))};