<template>
  <div class="container" ref="container" :style="`width:${width}px;height:${height}px`"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { sleep } from "@/utils/utils.js";
export default {
  props: ["width", "height","scale"],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      clock: null,
      model: null, // 模型
      mixer: null, // 加载动画
      actions: {}, // 模型所有动画
      activeAction: null,
      previousAction: null,
      activeStates: "",
      addOrMinus: "add",
      // scale: 5,
      isWavingAround: false,
      isRunningFromLeft: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化
    init() {
      //  创建场景对象Scene
      this.scene = new THREE.Scene();
      this.clock = new THREE.Clock();

      // 半球光
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
      hemiLight.position.set(0, 10, 0);
      this.scene.add(hemiLight);

      //直射光
      const dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.position.set(-30, 20, 10);
      this.scene.add(dirLight);
      
      const dirLight2 = new THREE.DirectionalLight(0x666666);
      dirLight2.position.set(30, 20, 10);
      this.scene.add(dirLight2);

      //载入glb
      const loader = new GLTFLoader();
      loader.load(
        "models/juese1.glb",
        (gltf) => {
          console.log("macheal", gltf);
          this.model = gltf.scene;
          this.model.scale = new THREE.Vector3(this.scale, this.scale, this.scale);
          this.model.position.set(0, -3, 0);
          this.model.rotation.y = Math.PI / 2;
          this.scene.add(this.model);
          this.getAnimation(this.model, gltf.animations);
          this.animate();
        },
        undefined,
        (e) => {
          console.error(e);
        }
      );

      //相机设置
      let container = this.$refs["container"];
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 100);
      this.camera.position.set(0.5, 2, 12);

      //渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },

    // requestAnimationFrame
    animate() {
      const dt = this.clock.getDelta();
      if (this.mixer) this.mixer.update(dt);
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    // 获取模型里的动画
    getAnimation(model, animations) {
      this.mixer = new THREE.AnimationMixer(model);
      for (let i = 0; i < animations.length; i++) {
        const clip = animations[i];
        const action = this.mixer.clipAction(clip);
        this.actions[clip.name] = action;
        console.log(clip.name);
      }
    },
    restoreState() {
      this.mixer.removeEventListener("finished", this.restoreState);
      this.fadeToAction(this.activeStates, 0.2);
    },
    // 执行动画
    fadeToAction(name, duration) {
      this.previousAction = this.activeAction;
      this.activeAction = this.actions[name];

      if (this.previousAction != undefined && this.previousAction !== this.activeAction) {
        this.previousAction.fadeOut(duration);
      }
      if (this.activeAction != undefined) {
        this.activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play();
      }
    },
    playAction(name) {
      this.reset();
      if (["Idle", "Run", "Talk", "Walk", "Wave","Point"].indexOf(name) == -1) {
        console.log('macheal',name);
        this[name]();
        return;
      }
      this.fadeToAction(name, 0.2);
      this.mixer.addEventListener("finished", this.restoreState);
    },
    reset() {
      this.isWavingAround = false;
      this.isRunningFromLeft = false;
    },
    //挥手+持续转身
    async WavingAround() {
      this.playAction("Wave");
      this.isWavingAround = true;
      this.WavingAroundCore();
    },
    async WavingAroundCore() {
      if (this.addOrMinus == "add") {
        this.model.rotation.y += 0.02;
      } else {
        this.model.rotation.y -= 0.02;
      }
      if (this.model.rotation.y >= 0.3) {
        this.addOrMinus = "minus";
      } else if (this.model.rotation.y <= -0.3) {
        this.addOrMinus = "add";
      }
      await sleep(40);
      // console.log("this.isWavingAround", this.isWavingAround);
      if (this.isWavingAround) {
        this.WavingAroundCore();
      }
    },
    //从远处跑过来
    async RunFromLeft() {
      this.playAction("Run");
      this.isRunningFromLeft = true;
      this.RunFromLeftCore();
    },
    async RunFromLeftCore() {
      if (this.model.rotation.y >= 0) {
        this.model.rotation.y -= 0.1;
      }
      console.log(this.model.rotation.y);
      await sleep(20);
      if (this.isRunningFromLeft) {
        this.RunFromLeftCore();
      }
    },
  },
};
</script>

<style>
/**/
</style>
