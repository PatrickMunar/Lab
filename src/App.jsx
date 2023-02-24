import {
  Float,
  Html,
  OrbitControls,
  Text,
  useFBO,
  useTexture,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import "./style.scss"
import gsap from "gsap"

import bubbleVertexShader from "./shaders/bubbleVertexShader"
import bubbleFragmentShader from "./shaders/bubbleFragmentShader"
import planeVertexShader from "./shaders/planeVertexShader"
import planeFragmentShader from "./shaders/planeFragmentShader"

import { DotScreen, EffectComposer } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { Perf } from "r3f-perf"

const Experience = () => {
  // Refraction Code learned and inspired from Maxime Heckel's blog
  // This reference gives us direct access to our mesh
  const description = useRef()
  const warning = useRef()

  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerWidth < window.innerHeight) {
        gsap.to(warning.current, { duration: 0, opacity: 0 })
      }
    }

    checkOrientation()
  }, [])

  const cameraGroup = useRef()
  const portfolio = useRef()
  const backgroundGroup = useRef()

  const mesh0 = useRef()
  const mesh1 = useRef()
  const mesh2 = useRef()
  const bubbles = [mesh0, mesh1, mesh2]
  const sideMesh0 = useRef()
  const sideMesh1 = useRef()

  const port0 = useRef()
  const port1 = useRef()
  const port2 = useRef()
  const port3 = useRef()
  const port4 = useRef()
  const port5 = useRef()
  const port6 = useRef()
  const port7 = useRef()
  const port8 = useRef()
  const port9 = useRef()
  const port10 = useRef()
  const port11 = useRef()

  const portTexture0 = useTexture("./images/0.png")
  const portTexture1 = useTexture("./images/1.png")
  const portTexture2 = useTexture("./images/2.png")
  const portTexture3 = useTexture("./images/3.png")
  const portTexture4 = useTexture("./images/4.png")
  const portTexture5 = useTexture("./images/5.png")

  const portTexture6 = useTexture("./images/6.png")
  const portTexture7 = useTexture("./images/7.png")
  const portTexture8 = useTexture("./images/8.png")
  const portTexture9 = useTexture("./images/9.png")
  const portTexture10 = useTexture("./images/10.png")
  const portTexture11 = useTexture("./images/11.png")

  /* Contents: bop, marble, claw, bznz, portfoliov2, gabito, ldr, noisegen, shader1, shader2, shader3, flagle */
  const linkArray = [
    "https://marblegame.patrickmunar.com/",
    "https://bznzcard.patrickmunar.com/",
    "https://ordernchaos.patrickmunar.com/",
    "https://gabito.patrickmunar.com/",
    "https://noisegen.patrickmunar.com/",
    "https://old.patrickmunar.com/",

    "https://simpleclaw.patrickmunar.com/",
    "https://www.patrickmunar.com/",
    "https://pixelatedgravity.patrickmunar.com/",
    "https://rgbsplits.patrickmunar.com/",
    "https://ldr.patrickmunar.com/",
    "https://flagle.felren.xyz/",
  ]

  const descriptionArray = [
    "Marble Game",
    "BZNZCard",
    "Order n Chaos",
    "Gabito",
    "Noise Generator",
    "Portfolio v1",

    "Claw Machine",
    "Portfolio v2",
    "Pixelated Gravity",
    "RGB Split",
    "Love Death + Robots",
    "Flagle",
  ]

  // This is our main render target where we'll render and store the scene as a texture
  const mainRenderTarget = useFBO()
  const backRenderTarget = useFBO()

  const sizes = {
    width: 0,
    height: 0,
  }

  const resetSizes = () => {
    if (window.innerHeight > window.innerWidth) {
      gsap.to(warning.current, { duration: 0, opacity: 1 })
      sizes.width = window.innerHeight
      sizes.height = window.innerWidth
    } else {
      gsap.to(warning.current, { duration: 0, opacity: 0 })
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
    }
  }

  resetSizes()

  const uniforms = useMemo(
    () => ({
      uRipple: {
        value: 1,
      },
      uTime: {
        value: 0,
      },
      uTexture: {
        value: null,
      },
      uIorR: { value: 1.15 },
      uIorY: { value: 1.15 },
      uIorG: { value: 1.15 },
      uIorC: { value: 1.15 },
      uIorB: { value: 1.15 },
      uIorP: { value: 1.15 },
      uRefractPower: {
        value: 0.22,
      },
      uChromaticAberration: {
        value: 0.15,
      },
      uSaturation: { value: 1 },
      uShininess: { value: 30.0 },
      uDiffuseness: { value: 0.1 },
      uFresnelPower: { value: 30 },
      uLight: {
        value: new THREE.Vector3(20, 10, 10),
      },
      winResolution: {
        value: new THREE.Vector2(sizes.width, sizes.height).multiplyScalar(
          Math.min(window.devicePixelRatio, 2)
        ), // if DPR is 3 the shader glitches 🤷‍♂️
      },
    }),
    []
  )

  // Plane Uniforms
  const planeUniform0 = useMemo(
    () => ({
      uTexture: {
        value: portTexture0,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  const planeUniform1 = useMemo(
    () => ({
      uTexture: {
        value: portTexture1,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  const planeUniform2 = useMemo(
    () => ({
      uTexture: {
        value: portTexture2,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  const planeUniform3 = useMemo(
    () => ({
      uTexture: {
        value: portTexture3,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  const planeUniform4 = useMemo(
    () => ({
      uTexture: {
        value: portTexture4,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  const planeUniform5 = useMemo(
    () => ({
      uTexture: {
        value: portTexture5,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  const planeUniform6 = useMemo(
    () => ({
      uTexture: {
        value: portTexture6,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  const planeUniform7 = useMemo(
    () => ({
      uTexture: {
        value: portTexture7,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  const planeUniform8 = useMemo(
    () => ({
      uTexture: {
        value: portTexture8,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  const planeUniform9 = useMemo(
    () => ({
      uTexture: {
        value: portTexture9,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  const planeUniform10 = useMemo(
    () => ({
      uTexture: {
        value: portTexture10,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  const planeUniform11 = useMemo(
    () => ({
      uTexture: {
        value: portTexture11,
      },
      uGreyIntensity: {
        value: 1,
      },
    }),
    []
  )

  // Resize
  window.addEventListener("resize", () => {
    resetSizes()

    for (let i = 0; i < bubbles.length; i++) {
      if (bubbles[i].current) {
        bubbles[i].current.material.uniforms.winResolution.value =
          new THREE.Vector2(sizes.width, sizes.height).multiplyScalar(
            Math.min(window.devicePixelRatio, 2)
          )
      }
    }
  })

  // Tick
  let bubbleUpSpeed = {
    value: 1.25,
  }
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].current.material.uniforms.uTime.value = time
    }

    state.camera.position.z = (10 * (1920 / 929)) / (sizes.width / sizes.height)

    const { gl, scene, camera } = state
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].current.visible = false
    }

    gl.setRenderTarget(mainRenderTarget)
    gl.render(scene, camera)

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].current.material.uniforms.uTexture.value =
        mainRenderTarget.texture
      bubbles[i].current.material.side = THREE.FrontSide
    }
    gl.setRenderTarget(backRenderTarget)
    gl.render(scene, camera)

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].current.material.uniforms.uTexture.value =
        backRenderTarget.texture
      bubbles[i].current.material.side = THREE.BackSide
      bubbles[i].current.visible = true
    }

    gl.setRenderTarget(null)

    mesh0.current.position.x = state.pointer.x * 0.5
    mesh0.current.position.y = state.pointer.y * 0.5

    state.camera.rotation.y = -state.pointer.x * 0.0008
    state.camera.rotation.x = state.pointer.y * 0.0008
    portfolio.current.rotation.y = -state.pointer.x * 0.0004
    portfolio.current.rotation.x = state.pointer.y * 0.0004

    for (let i = 0; i < bubbles.length; i++) {
      if (i != 0) {
        if (bubbles[i].current.position.y < 12) {
          bubbles[i].current.position.y += delta * bubbleUpSpeed.value
        } else {
          bubbles[i].current.position.y = -15 + Math.random() * 3
          if (i == 1) {
            const meshScale = (Math.random() - 0.5) * 0.5 + 0.75
            bubbles[i].current.scale.set(meshScale, meshScale, meshScale)
            bubbles[i].current.position.x = -Math.random() * 12 - 6
            sideMesh0.current.position.z = (Math.random() - 0.5) * 2
          } else {
            const meshScale = (Math.random() - 0.5) * 0.5 + 0.75
            bubbles[i].current.scale.set(meshScale, meshScale, meshScale)
            bubbles[i].current.position.x = Math.random() * 12 + 6
            sideMesh1.current.position.z = (Math.random() - 0.5) * 2
          }
        }
      }
    }

    gsap.to(description.current, {
      duration: 0,
      x:
        (state.pointer.x *
          (sizes.width - description.current.clientWidth * 2)) /
        2,
      y: -(state.pointer.y * sizes.height) / 2,
    })
  })

  // Events
  gsap.to(description.current, { duration: 0, opacity: 0 })

  const enterPortfolio = (e) => {
    gsap.to(e.object.material.uniforms.uGreyIntensity, {
      duration: 0.5,
      value: 0,
    })
    if (e.object.position.x < 0) {
      gsap.to(e.object.position, { duration: 0.5, x: -45 + 2 })
    } else {
      gsap.to(e.object.position, { duration: 0.5, x: 45 - 2 })
    }
    document.body.style.cursor = "pointer"
    description.current.innerText = descriptionArray[parseInt(e.object.name)]
    gsap.to(description.current, { duration: 0.1, opacity: 1 })
  }

  const leavePortfolio = (e) => {
    gsap.to(e.object.material.uniforms.uGreyIntensity, {
      duration: 0.5,
      value: 1,
    })
    if (e.object.position.x < 0) {
      gsap.to(e.object.position, { duration: 0.5, x: -45 })
    } else {
      gsap.to(e.object.position, { duration: 0.5, x: 45 })
    }
    document.body.style.cursor = "default"
    gsap.to(description.current, { duration: 0.1, opacity: 0 })
  }

  const clickPortfolio = (e) => {
    window.location.href = linkArray[parseInt(e.object.name)]
  }

  const enterMail = (e) => {
    gsap.to(e.object.position, { duration: 0.25, y: -10.75 + 0.1 })
    for (let i = 0; i < bubbles.length; i++) {
      gsap.to(bubbles[i].current.material.uniforms.uRipple, {
        duration: 0.25,
        value: 5,
      })
    }
    gsap.to(bubbleUpSpeed, { duration: 0.25, value: 0 })
    document.body.style.cursor = "pointer"
  }

  const leaveMail = (e) => {
    gsap.to(e.object.position, { duration: 0.25, y: -10.75 })
    for (let i = 0; i < bubbles.length; i++) {
      gsap.to(bubbles[i].current.material.uniforms.uRipple, {
        duration: 0.25,
        value: 1,
      })
    }
    gsap.to(bubbleUpSpeed, { duration: 0.25, value: 1.25 })
    document.body.style.cursor = "default"
  }

  const clickMail = (e) => {
    window.location.href = "mailto:rptmunar@gmail.com"
  }

  return (
    <>
      {/* <Perf /> */}
      {/* <OrbitControls /> */}
      <color attach="background" args={["#f3f3f3"]} />
      <EffectComposer>
        <DotScreen
          blendFunction={BlendFunction.NORMAL} // blend mode
          angle={Math.PI / 4} // angle of the dot pattern
          scale={1} // scale of the dot pattern
        />
      </EffectComposer>

      {/* Camera Group */}
      <group ref={cameraGroup}>
        <group ref={backgroundGroup} position={[0, 0, -5]}>
          <Text
            font="./fonts/NeutralFace.otf"
            color="#000000"
            position={[0, 9, 0]}
            scale={2}
          >
            ADOBE PHOTOSHOP | ADOBE XD
          </Text>
          <Text
            font="./fonts/NeutralFace.otf"
            color="#000000"
            position={[0, 7, 0]}
            scale={2}
          >
            FUSION 360 | BLENDER
          </Text>
          <Text
            font="./fonts/NeutralFace-Bold.otf"
            color="#000000"
            position={[0, 3.5, 0]}
            scale={3}
          >
            Creative
          </Text>
          <Text font="./fonts/NeutralFace-Bold.otf" color="#000000" scale={4}>
            Patrick Munar
          </Text>
          <Text
            font="./fonts/NeutralFace-Bold.otf"
            color="#000000"
            position={[0, -3.5, 0]}
            scale={3}
          >
            Developer
          </Text>
          <Text
            font="./fonts/NeutralFace.otf"
            color="#000000"
            position={[0, -7, 0]}
            scale={2}
          >
            HTML | CSS | SASS | JS
          </Text>
          <Text
            font="./fonts/NeutralFace.otf"
            color="#000000"
            position={[0, -9, 0]}
            scale={2}
          >
            THREE.JS | REACT | R3F | RAPIER
          </Text>
          <Text
            font="./fonts/NeutralFace-Bold.otf"
            color="#000000"
            position={[0, -10.75, 0]}
            scale={0.8}
            onPointerEnter={enterMail}
            onPointerLeave={leaveMail}
            onClick={clickMail}
          >
            rptmunar@gmail.com
          </Text>
          <Html>
            <div className="htmlDiv">
              <div ref={description} className="descriptionFollowerDiv">
                Marble Game
              </div>

              <div ref={warning} className="orientationWarning">
                <div className="warningText0">LANDSCAPE</div>
                <div className="warningText1">LANDSCAPE</div>
              </div>
            </div>
          </Html>
        </group>

        {/* Main Bubble */}
        <group>
          <mesh ref={mesh0} position={[0, 0, 0]} scale={4.5}>
            <icosahedronGeometry args={[1, 100]} />
            <shaderMaterial
              vertexShader={bubbleVertexShader}
              fragmentShader={bubbleFragmentShader}
              uniforms={uniforms}
            />
          </mesh>
        </group>
        <group ref={sideMesh0} position={[0, 0, 0]}>
          <mesh
            ref={mesh1}
            position={[-Math.random() * 12 - 6, 0, 0]}
            scale={0.75}
          >
            <icosahedronGeometry args={[1, 100]} />
            <shaderMaterial
              vertexShader={bubbleVertexShader}
              fragmentShader={bubbleFragmentShader}
              uniforms={uniforms}
            />
          </mesh>
        </group>
        <group ref={sideMesh1} position={[0, 0, 0]}>
          <mesh
            ref={mesh2}
            position={[Math.random() * 12 + 6, -12, 0]}
            scale={0.75}
          >
            <icosahedronGeometry args={[1, 100]} />
            <shaderMaterial
              vertexShader={bubbleVertexShader}
              fragmentShader={bubbleFragmentShader}
              uniforms={uniforms}
            />
          </mesh>
        </group>
      </group>

      {/* Portfolio */}
      <group
        ref={portfolio}
        position={[
          0,
          0,
          (10 * (1920 / 929)) / (sizes.width / sizes.height) + 50,
        ]}
      >
        <mesh
          ref={port0}
          name="0"
          position={[
            -45,
            22.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform0}
            transparent
          />
        </mesh>
        <mesh
          ref={port1}
          name="1"
          position={[
            -45,
            13.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform1}
            transparent
          />
        </mesh>
        <mesh
          ref={port2}
          name="2"
          position={[
            -45,
            4.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform2}
            transparent
          />
        </mesh>
        <mesh
          ref={port3}
          name="3"
          position={[
            -45,
            -4.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform3}
            transparent
          />
        </mesh>
        <mesh
          ref={port4}
          name="4"
          position={[
            -45,
            -13.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform4}
            transparent
          />
        </mesh>
        <mesh
          ref={port5}
          name="5"
          position={[
            -45,
            -22.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform5}
            transparent
          />
        </mesh>

        <mesh
          ref={port6}
          name="6"
          position={[
            45,
            22.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform6}
            transparent
          />
        </mesh>
        <mesh
          ref={port7}
          name="7"
          position={[
            45,
            13.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform7}
            transparent
          />
        </mesh>
        <mesh
          ref={port8}
          name="8"
          position={[
            45,
            4.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform8}
            transparent
          />
        </mesh>
        <mesh
          ref={port9}
          name="9"
          position={[
            45,
            -4.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform9}
            transparent
          />
        </mesh>
        <mesh
          ref={port10}
          name="10"
          position={[
            45,
            -13.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform10}
            transparent
          />
        </mesh>
        <mesh
          ref={port11}
          name="11"
          position={[
            45,
            -22.5,
            -((10 * (1920 / 929)) / (sizes.width / sizes.height)) - 70,
          ]}
          onPointerEnter={enterPortfolio}
          onPointerLeave={leavePortfolio}
          onClick={clickPortfolio}
        >
          <planeGeometry args={[(8 * 1920) / 1080, 8]} />
          <shaderMaterial
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            uniforms={planeUniform11}
            transparent
          />
        </mesh>
      </group>
    </>
  )
}

const Scene = () => {
  return (
    <>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 10] }}
        dpr={[1, 2]}
      >
        <directionalLight position={[20, 10, 10]} />
        <ambientLight intensity={1.0} />
        <Experience />
      </Canvas>
    </>
  )
}

export default Scene
