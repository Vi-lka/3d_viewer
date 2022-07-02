import axios from "axios";
import { Suspense, useContext, useState } from "react";
import { Context } from "../../context/Context";
import Model from "../model/Model";
import "./edit.css";

import { Canvas } from "@react-three/fiber"
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { AdaptiveEvents, Bounds, Center, Environment, Html, Lightformer, Loader, OrbitControls, PerspectiveCamera, Preload, Shadow, softShadows, useProgress } from "@react-three/drei";
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useControls } from 'leva'
import { saveAs } from 'file-saver';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Edit() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const [title, setTitle] = useState("")
  const [info, setInfo] = useState("")

  const [model, setModel] = useState<any | null>(null)
  const [modelURL, setmodelURL] = useState("")

  const [colorMap, setcolorMap] = useState<any | null>(null)
  const [colorMapURL, setcolorMapURL] = useState("")

  const [normalMap, setnormalMap] = useState<any | null>(null)
  const [normalMapURL, setnormalMapURL] = useState("")

  const [metalnessMap, setmetalnessMap] = useState<any | null>(null)
  const [metalnessMapURL, setmetalnessMapURL] = useState("")
  const [metalness, setMetalness] = useState("0")

  const [roughnessMap, setroughnessMap] = useState<any | null>(null)
  const [roughnessMapURL, setroughnessMapURL] = useState("")
  const [roughness, setRoughness] = useState("1")

  const [aoMap, setaoMap] = useState<any | null>(null)
  const [aoMapURL, setaoMapURL] = useState("")

  const [gl, setGL] = useState<any | null>(null)

  const [screenshot, setScreenshot] = useState<any | null>(null)

  const { user } = useContext(Context)

  const [descriptionEditState, setdescriptionEditState] = useState(false)

  const openDescriptionEdit = () => setdescriptionEditState(true)
  const closeDescriptionEdit = () => setdescriptionEditState(false)

  var SendErr = false

  const handleSubmit = async (e: any)=>{
    e.preventDefault()
    const newPost = {
      username: user.username,
      title,
      info,
      model,
      colorMap,
      normalMap,
      metalnessMap,
      metalness,
      roughnessMap,
      roughness,
      aoMap,
      screenshot
    }
    if(model){
      const data = new FormData()
      const modelname = model['name']
      data.append("name", modelname)
      data.append("model", model)
      newPost.model = modelname
      try{
        await axiosInstance.post("/uploadModel", data)
        SendErr = true
      }catch (err){
        console.log(err)
        SendErr = false
        return
      }
    }
    if(colorMap){
      const data = new FormData()
      const colorMapname = colorMap['name']
      data.append("name", colorMapname)
      data.append("colorMap", colorMap)
      newPost.colorMap = colorMapname
      try{
        await axiosInstance.post("/uploadColorMap", data)
        SendErr = true
      }catch (err){
        console.log(err)
        SendErr = false
        return
      }
    }
    if(normalMap){
      const data = new FormData()
      const normalMapname = normalMap['name']
      data.append("name", normalMapname)
      data.append("normalMap", normalMap)
      newPost.normalMap = normalMapname
      try{
        await axiosInstance.post("/uploadNormalMap", data)
        SendErr = true
      }catch (err){
        console.log(err)
        SendErr = false
        return
      }
    }
    if(metalnessMap){
      const data = new FormData()
      const metalnessMapname = metalnessMap['name']
      data.append("name", metalnessMapname)
      data.append("metalnessMap", metalnessMap)
      newPost.metalnessMap = metalnessMapname
      try{
        await axiosInstance.post("/uploadMetalnessMap", data)
        SendErr = true
      }catch (err){
        console.log(err)
        SendErr = false
        return
      }
    }
    if(roughnessMap){
      const data = new FormData()
      const roughnessMapname = roughnessMap['name']
      data.append("name", roughnessMapname)
      data.append("roughnessMap", roughnessMap)
      newPost.roughnessMap = roughnessMapname
      try{
        await axiosInstance.post("/uploadRoughnessMap", data)
        SendErr = true
      }catch (err){
        console.log(err)
        SendErr = false
        return
      }
    }
    if(aoMap){
      const data = new FormData()
      const aoMapname = aoMap['name']
      data.append("name", aoMapname)
      data.append("aoMap", aoMap)
      newPost.aoMap = aoMapname
      try{
        await axiosInstance.post("/uploadAOMap", data)
        SendErr = true
      }catch (err){
        console.log(err)
        SendErr = false
        return
      }
    }
    if(screenshot){
      const data = new FormData()
      const screenshotname = `${title}` + screenshot['name']
      data.append("name", screenshotname)
      data.append("screenshot", screenshot)
      newPost.screenshot = screenshotname
      try{
        await axiosInstance.post("/uploadScreenshot", data)
        SendErr = true
      }catch (err){
        console.log(err)
        SendErr = false
        return
      }
    }
    try{
      if(SendErr) {
        const res = await axiosInstance.post("/posts", newPost)
        window.location.replace("/post/" + res.data._id)
      }
    }catch (err) {
      console.log(err)
    }
  }

  function makeScreenshot() {
    var imgData;
	  var strMime = "image/png";
    imgData = gl.domElement.toDataURL(strMime);
    dataURLtoFile(`${imgData}`, "_screenshot.png")
  }

  function dataURLtoFile(dataurl: any, filename:string) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    var screenshotFile = new File([u8arr], filename, {type:mime})
    
    setScreenshot(screenshotFile)
  }

  // const [{ colormap }, set] = useControls(() => ({ colormap: { 
  //   image: colorMapURL
  //   } 
  // }))

  function  Scene() {
    
    // const colormap = useControls({ colormap: { 
    //   image: colorMapURL,
    //     onChange: (e) => {
    //       setcolorMapURL(e)
    //     }, transient: false
    //   }
    // })

    const [colormap, normalmap, metalnessmap, roughnessmap, aomap] = useLoader(TextureLoader, [
      colorMapURL ? colorMapURL : ('/models/null_texture.png'),
      normalMapURL ? normalMapURL : ('/models/null_texture_normal.png'),
      metalnessMapURL ? metalnessMapURL : ('/models/null_texture.png'),
      roughnessMapURL ? roughnessMapURL : ('/models/null_texture.png'),
      aoMapURL ? aoMapURL : ('/models/null_texture.png'),
    ])

    let material= new THREE.MeshPhysicalMaterial(
      {
        color: "#7a7a7a",
        map:  colormap,
        normalMap: normalmap,
        metalnessMap: metalnessmap,
        metalness: parseFloat(metalness),
        roughnessMap: roughnessmap, 
        roughness: parseFloat(roughness),
        aoMap: aomap,
      }
    )

    let nullMaterial= new THREE.MeshPhysicalMaterial(
      {
        color: "#7a7a7a",
        normalMap: normalmap,
        metalnessMap: metalnessmap,
        metalness: parseFloat(metalness),
        roughnessMap: roughnessmap, 
        roughness: parseFloat(roughness),
        aoMap: aomap,
      }
    )

    const fbx = useLoader(FBXLoader, `${modelURL}`)
    fbx.traverse(function (child) {
      if ((child as THREE.Mesh).isMesh) {
        colorMapURL ? ((child as THREE.Mesh).material = material) : ((child as THREE.Mesh).material = nullMaterial);
        (child as THREE.Mesh).castShadow = true;
        (child as THREE.Mesh).receiveShadow = true;
      }
    })
    
    return (
      <>
        <primitive object={fbx} position={[0, 0, 0]} scale={0.05} receiveShadow castShadow />
      </>
    ) 
  }

  softShadows()

  return (
    <div className="edit">
      {
        model ? 
        (<>
          <form className="editForm" onSubmit={handleSubmit}>
              <label className="fileInputLabel" htmlFor="fileInput">
                <img className="fileInputIcon" src="/img/upload.png" alt="" />
                Загрузить модель
              </label>
              <input 
                type="file" 
                id="fileInput" 
                style={{display:"none"}} 
                name="model"
                onChange={(e)=>{
                  setModel(e.target.files![0])
                  setmodelURL(URL.createObjectURL(e.target.files![0]))
                }}
              />

              <div className="editFormGroup">
                <label className="fileInputLabelmap" htmlFor="fileInputColorMap">
                  <img className="fileInputIconmap" src="/img/add_1.png" alt="" />
                  {
                    colorMapURL && <img className="fileInputImgmap" src={colorMapURL} alt="" />
                  }
                  Base Color
                </label>
                <input 
                  type="file"
                  id="fileInputColorMap"
                  style={{display:"none"}} 
                  onChange={(e) =>{
                    setcolorMap(e.target.files![0])
                    setcolorMapURL(URL.createObjectURL(e.target.files![0]))
                  }} 
                />
              </div>

              <div className="editFormGroup">
                <label className="fileInputLabelmap" htmlFor="fileInputNormalMap">
                  <img className="fileInputIconmap" src="/img/add_1.png" alt="" />
                  {
                    normalMapURL && <img className="fileInputImgmap" src={normalMapURL} alt="" />
                  }
                  Normal Map
                </label>
                <input 
                  type="file"
                  id="fileInputNormalMap"
                  style={{display:"none"}} 
                  onChange={(e) =>{
                    setnormalMap(e.target.files![0])
                    setnormalMapURL(URL.createObjectURL(e.target.files![0]))
                  }} 
                />
              </div>

              <div className="editFormGroup">
                <label className="fileInputLabelmap" htmlFor="fileInputMetalnessMap">
                  <img className="fileInputIconmap" src="/img/add_1.png" alt="" />
                  {
                    metalnessMapURL && <img className="fileInputImgmap" src={metalnessMapURL} alt="" />
                  }
                  Metalness Map
                </label>
                <input 
                  type="file"
                  id="fileInputMetalnessMap"
                  style={{display:"none"}} 
                  onChange={(e) =>{
                    setmetalnessMap(e.target.files![0])
                    setmetalnessMapURL(URL.createObjectURL(e.target.files![0]))
                  }} 
                />

                <label className="InputLabelmap" htmlFor="InputMetalness">
                  Metalness
                </label>
                <div className="InputDiv">
                  <input 
                    className="Rangemap slider-progress"
                    type="range" 
                    value={metalness} 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    id="metalnessRange"
                    onChange={e => setMetalness(e.target.value)}
                  />
                  <input 
                    className="Inputmap"
                    type="number"
                    placeholder="Set Metalness"
                    id="InputMetalness"
                    value={metalness}
                    min="0" 
                    max="1"
                    step="0.1"
                    onChange={e => setMetalness(e.target.value)}
                  />
                </div>
              </div>

              <div className="editFormGroup">
                <label className="fileInputLabelmap" htmlFor="fileInputRoughnessMap">
                  <img className="fileInputIconmap" src="/img/add_1.png" alt="" />
                  {
                    roughnessMapURL && <img className="fileInputImgmap" src={roughnessMapURL} alt="" />
                  }
                  Roughness Map
                </label>
                <input 
                  type="file"
                  id="fileInputRoughnessMap"
                  style={{display:"none"}} 
                  onChange={(e) =>{
                    setroughnessMap(e.target.files![0])
                    setroughnessMapURL(URL.createObjectURL(e.target.files![0]))
                  }} 
                />

                <label className="InputLabelmap" htmlFor="InputRoughness">
                  Roughness
                </label>
                <div className="InputDiv">
                  <input 
                    className="Rangemap slider-progress"
                    type="range" 
                    value={roughness} 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    id="roughnessRange"
                    onChange={e => setRoughness(e.target.value)}
                  />
                  <input 
                    className="Inputmap"
                    type="number"
                    placeholder="Set Roughness" 
                    id="InputRoughness"
                    value={roughness}
                    step="0.1"
                    min="0" 
                    max="1"
                    onChange={e => setRoughness(e.target.value)}
                  />
                </div>
              </div>

              <div className="editFormGroup">
                <label className="fileInputLabelmap" htmlFor="fileInputAOMap">
                  <img className="fileInputIconmap" src="/img/add_1.png" alt="" />
                  {
                    aoMapURL && <img className="fileInputImgmap" src={aoMapURL} alt="" />
                  }
                  Ambient Occlusion Map
                </label>
                <input 
                  type="file"
                  id="fileInputAOMap"
                  style={{display:"none"}} 
                  onChange={(e) =>{
                    setaoMap(e.target.files![0])
                    setaoMapURL(URL.createObjectURL(e.target.files![0]))
                  }} 
                />
              </div>

              {screenshot && <img className="ScreenShotPhoto" src={URL.createObjectURL(screenshot)} alt="" />}

              <button type="button" className="ScreenShot" onClick={makeScreenshot}>
                <img className="ScreenShotIcon" src="/img/add-photo_1.png" alt="" />
                Скриншот
              </button>

              <div className="Description">
                {title && <h1 className="DescriptionTitle">{ title }</h1>}
                {info && <p className="DescriptionInfo">{ info.length > 250 ? `${info.substring(0, 250)}...` : info }</p>}
              </div>

              <button type="button" className="OpenDescriptionEdit" onClick={openDescriptionEdit}>
                <img className="OpenDescriptionEditIcon" src="/img/write_1.png" alt="" />
                Описание
              </button>

            <button className="editFormSubmit" type="submit">
                Опубликовать
            </button>
          </form>

          {
            descriptionEditState && 
            <div className="DescriptionEdit">
              <img className="DescriptionEditClose" src="/img/cancel_1.png" alt="" onClick={closeDescriptionEdit}/>

              <input 
                type="text" 
                placeholder="Название" 
                className="titleInput"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />

              <textarea 
                placeholder="Описание" 
                className="textInput"
                name="info"
                value={info}
                onChange={e => setInfo(e.target.value)}
              ></textarea>
            </div>
          }

        </>) : (<>
          <label className="fileInputLabelStart" htmlFor="fileInput">
            <img className="fileInputIconStart" src="/img/upload.png" alt="" />
            Загрузить модель
          </label>
          <input 
            type="file" 
            id="fileInput" 
            style={{display:"none"}} 
            name="model"
            onChange={(e)=>{
              setModel(e.target.files![0])
              setmodelURL(URL.createObjectURL(e.target.files![0]))
            }}
          />
        </>)
      }
      {
        model ? (
          <>
            <div key="" id="CanvasFrame" className="modelWrapper">
              {
                <>
                  <Canvas 
                    shadows={true} 
                    camera={{fov: 45, near: 0.1, far: 1000, position: [0, 0, 10]}}
                    gl={{ preserveDrawingBuffer: true }}
                    onCreated={({ gl, events }) => { setGL(gl) }}
                  >
                    <Suspense fallback={
                      <Html>
                        <Loader
                          dataStyles={{color: "#000000"}} // Text styles
                          dataInterpolation={(p) => `Loading ${p.toFixed(1)}%`} // Text
                          initialState={(active) => active} // Initial black out state 
                        />
                      </Html> 
                    }>
                      <ambientLight intensity={1} />
                      <pointLight position={[0, 10, 10]} intensity={1} />
                      <pointLight position={[0, -10, -10]} intensity={1} />
                      <pointLight position={[0, 0, 30]} intensity={1} color="#c5c5c5" />
                      <pointLight position={[0, 0, -30]} intensity={1} color="#c5c5c5" />
                      <directionalLight position={[-5, 8, -4]} intensity={1}/>
                      {/* <hemisphereLight color="#000000" groundColor="#b9b9b9" position={[-7, 25, 13]} intensity={0.85} /> */}
                      <directionalLight
                        castShadow
                        position={[2, 8, 4]}
                        intensity={0.22}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-camera-far={50}
                        shadow-camera-left={-10}
                        shadow-camera-right={10}
                        shadow-camera-top={10}
                        shadow-camera-bottom={-10}
                      />
                      <Bounds fit clip observe damping={0} margin={1.2}>
                        <Center>
                          <Scene/>
                        </Center>
                      </Bounds>
                      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} receiveShadow>
                        <planeBufferGeometry attach="geometry" args={[100, 100]} />
                        <shadowMaterial attach="material" transparent opacity={0.4} />
                      </mesh> */}
                      <OrbitControls />
                      <Environment preset="warehouse" />
                    </Suspense>
                  </Canvas>
                </>
              }
            </div>
          </>
        ) : (
          <br />
        )  
      }
    </div>
  )
}

