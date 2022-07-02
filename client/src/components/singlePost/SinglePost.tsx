import "./singlePost.css";
import "../../pages/edit/edit.css"
import Postimg from "./Post-img.jpg"
import { Link, useLocation } from "react-router-dom";
import { Suspense, useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

import { Canvas, useThree } from "@react-three/fiber"
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Backdrop, Bounds, Center, Environment, Html, Lightformer, Loader, OrbitControls, PerspectiveCamera, Plane, Shadow, softShadows, useBounds, useFBX, useProgress } from "@react-three/drei";
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from "three";

export default function SinglePost({post}: {post:any}, {key}: {key:any}) {

  const location = useLocation()
  const path = location.pathname.split("/")[2]

  const [title, setTitle] = useState("")
  const [info, setInfo] = useState("")

  const [model, setModel] = useState<any | null>(null)
  const [modelUrl, setModelUrl] = useState<any | null>(null)

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

  const [updateMode, setUpdateMode] = useState(false)
  const [modelChange, setModelChange] = useState(false)
  const [colorMapChange, setColorMapChange] = useState(false)
  const [normalMapChange, setNormalMapChange] = useState(false)
  const [metalnessMapChange, setMetalnessMapChange] = useState(false)
  const [roughnessMapChange, setRoughnessMapChange] = useState(false)
  const [aoMapChange, setAoMapChange] = useState(false)
  const [screenshotChange, setScreenshotChange] = useState(false)

  const publicFoulder = "http://localhost:5000/uploads/"

  const [gl, setGL] = useState<any | null>(null)

  const [screenshot, setScreenshot] = useState<any | null>(null)
  const [screenshotURL, setScreenshotURL] = useState("")

  const { user } = useContext(Context)

  const [descriptionEditState, setdescriptionEditState] = useState(false)

  const openDescriptionEdit = () => setdescriptionEditState(true)
  const closeDescriptionEdit = () => setdescriptionEditState(false)

  var SendErr = false

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  useEffect(()=>{
    const getPost = async ()=>{
      const res = await axiosInstance.get("/posts/" + path)
      setTitle(res.data.title)
      setInfo(res.data.info)
      setModel(res.data.model)
      setcolorMap(res.data.colorMap)
      setnormalMap(res.data.normalMap)
      setmetalnessMap(res.data.metalnessMap)
      setMetalness(res.data.metalness)
      setroughnessMap(res.data.roughnessMap)
      setRoughness(res.data.roughness)
      setaoMap(res.data.aoMap)
      setScreenshot(res.data.screenshot)
    }
    getPost()
  },[path])

  function handleFalseUpdateMode() {
    setUpdateMode(false)
    window.location.reload()
  }

  const handleDelete = async ()=>{
    try{
      await axiosInstance.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      })
      window.location.replace("/gallery")
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = async ()=>{
    const updatePost = {
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
      updatePost.model = modelname
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
      updatePost.colorMap = colorMapname
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
      updatePost.normalMap = normalMapname
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
      updatePost.metalnessMap = metalnessMapname
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
      updatePost.roughnessMap = roughnessMapname
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
      updatePost.aoMap = aoMapname
      try{
        await axiosInstance.post("/uploadAOMap", data)
        SendErr = true
      }catch (err){
        console.log(err)
        SendErr = false
        return
      }
    }
    if(screenshotChange){
      const data = new FormData()
      const screenshotname = `${title}` + screenshot['name']
      data.append("name", screenshotname)
      data.append("screenshot", screenshot)
      updatePost.screenshot = screenshotname
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
        await axiosInstance.put(`/posts/${post._id}`, updatePost)
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  function makeScreenshot() {
    setScreenshotChange(true)
    var imgData;
	  var strMime = "image/png";
    imgData = gl.domElement.toDataURL(strMime);
    setScreenshotURL(`${imgData}`)
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

  const Scene = () => {

    const [colormap, normalmap, metalnessmap, roughnessmap, aomap] = useLoader(TextureLoader, [
      colorMapChange ? 
      (colorMapURL) : (colorMap ? (publicFoulder + colorMap) : ('/models/null_texture.png')),
      normalMapChange ? 
      (normalMapURL) : (normalMap ? (publicFoulder + normalMap) : ('/models/null_texture_normal.png')),
      metalnessMapChange ? 
      (metalnessMapURL) : (metalnessMap ? (publicFoulder + metalnessMap) : ('/models/null_texture.png')),
      roughnessMapChange ? 
      (roughnessMapURL) : (roughnessMap ? (publicFoulder + roughnessMap) : ('/models/null_texture.png')),
      aoMapChange ? 
      (aoMapURL) : (aoMap ? (publicFoulder + aoMap) : ('/models/null_texture.png')),
    ])


    let material= new THREE.MeshPhysicalMaterial(
      {
        color: "#7a7a7a",
        map: colormap,
        normalMap: normalmap,
        metalnessMap: metalnessmap,
        metalness: parseFloat(metalness),
        roughnessMap: roughnessmap, 
        roughness: parseFloat(roughness),
        aoMap: aomap,
        }
    );

      const fbx = useFBX(`${ modelChange ? modelUrl : publicFoulder + model }`)
      fbx.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = material;
          (child as THREE.Mesh).castShadow = true;
          (child as THREE.Mesh).receiveShadow = true;
        }
      })

      return (
        <>
            <primitive object={fbx} position={[0, 0, 0]} scale={0.05} receiveShadow castShadow />
        </>
      )
  };

  softShadows()

  return (
    <>
    <div className="singlePost">
      <div className="singlePostWrapper">
        {
          updateMode ? (
          <>
          <div className="editForm">
            <button
              type="button"
              className="singlePostSubmit"
              onClick={handleFalseUpdateMode}
            >
              Отмена
            </button>

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
                  setModelUrl(URL.createObjectURL(e.target.files![0]))
                  setModelChange(true)
                }}
              />

              <div className="editFormGroup">
                <label className="fileInputLabelmap" htmlFor="fileInputColorMap">
                  <img className="fileInputIconmap" src="/img/add_1.png" alt="" />
                  {
                    colorMapURL ? 
                    (<img className="fileInputImgmap" src={colorMapURL} alt="" />)
                    :
                    (colorMap ? 
                      (<img className="fileInputImgmap" src={publicFoulder + colorMap} alt="" />)
                      :
                      (null)
                    )
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
                    setColorMapChange(true)
                  }} 
                />
              </div>

              <div className="editFormGroup">
                <label className="fileInputLabelmap" htmlFor="fileInputNormalMap">
                  <img className="fileInputIconmap" src="/img/add_1.png" alt="" />
                  {
                    normalMapURL ? 
                    (<img className="fileInputImgmap" src={normalMapURL} alt="" />)
                    :
                    (normalMap ? 
                      (<img className="fileInputImgmap" src={publicFoulder + normalMap} alt="" />)
                      :
                      (null)
                    )
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
                    setNormalMapChange(true)
                  }} 
                />
              </div>

              <div className="editFormGroup">
                <label className="fileInputLabelmap" htmlFor="fileInputMetalnessMap">
                  <img className="fileInputIconmap" src="/img/add_1.png" alt="" />
                  {
                    metalnessMapURL ? 
                    (<img className="fileInputImgmap" src={metalnessMapURL} alt="" />)
                    :
                    (metalnessMap ? 
                      (<img className="fileInputImgmap" src={publicFoulder + metalnessMap} alt="" />)
                      :
                      (null)
                    )
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
                    setMetalnessMapChange(true)
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
                    roughnessMapURL ? 
                    (<img className="fileInputImgmap" src={roughnessMapURL} alt="" />)
                    :
                    (roughnessMap ? 
                      (<img className="fileInputImgmap" src={publicFoulder + roughnessMap} alt="" />)
                      :
                      (null)
                    )
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
                    setRoughnessMapChange(true)
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
                    aoMapURL ? 
                    (<img className="fileInputImgmap" src={aoMapURL} alt="" />)
                    :
                    (aoMap ? 
                      (<img className="fileInputImgmap" src={publicFoulder + aoMap} alt="" />)
                      :
                      (null)
                    )
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
                    setAoMapChange(true)
                  }} 
                />
              </div>

              {
                screenshotChange ? 
                (<img className="ScreenShotPhoto" src={screenshotURL} alt="" />)
                :
                (<img className="ScreenShotPhoto" src={publicFoulder + screenshot} alt="" />)
              }

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

            <button className="singlePostSubmit" onClick={handleUpdate}>
              Обновить
            </button>
          </div>

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

            <div key="" id="CanvasFrame" className="modelWrapperSingleEdit">
            { model && 
              <>
              <Canvas 
                shadows={true} 
                camera={{fov: 45, near: 0.1, far: 1000, position: [0, 0, 10]}}
                gl={{ preserveDrawingBuffer: true }}
                onCreated={({ gl, events }) => {setGL(gl)}}
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
          </>) : (<>
            <div key="" id="CanvasFrame" className="modelWrapperSingle">
            { model && 
              <>
                <Canvas 
                  shadows={true} 
                  camera={{fov: 45, near: 0.1, far: 1000, position: [0, 0, 10]}}
                  gl={{ preserveDrawingBuffer: true }}
                  onCreated={({ gl, events }) => {
                    setGL(gl)
                  }}
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
                        <Scene />
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

          <h1 className="singlePostTitle">{title}</h1>

          <div className="singlePostInfo"><p>{info}</p></div>

          {
            user ? (
              <div className="singlePostEdit">
                <img className="singlePostIcon" src="/img/write_1.png" alt="" onClick={()=>setUpdateMode(true)}/>
                <img className="singlePostIcon" src="/img/trash_1.png" alt="" onClick={handleDelete}/>
              </div>
            ) : (
            null
            )
          }
        </>)
        }

        {/* <div className="postCats">
          {post.categories?.map((catname:string, key:string) => (
            <Link key={key} className="link postCat" to={`/gallery/?cat=${catname}`}>
              <span>{catname}</span>
            </Link>
          ))}
        </div> */}
      </div>
    </div>
    </>
  )
}
