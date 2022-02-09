const path = require('path');
const colors = require('colors');
const { FFCreatorCenter, FFScene, FFText, FFImage, FFCreator } = require('../types');

const width = 600;
const height = 400;
const bg1 = path.join(__dirname, './assets/imgs/bg/h04.jpg');
const bg2 = path.join(__dirname, './assets/imgs/bg/h05.jpg');
const logo2 = path.join(__dirname, './assets/imgs/logo/logo2.png');
const outputDir = path.join(__dirname, './output/');
const cacheDir = path.join(__dirname, './cache/');

const transitionDemoTask = () => {
  // const trans = ['Magnifier','Colorful','WaterWave','Stretch','BackOff','HangAround','Windows4','Fat','MoveLeft','Oblique','Shake','Slice','Tetrapod','ZoomRight','FastSwitch','Fluidly','Lens','Radiation','TricolorCircle','WindowShades','Bounce','BowTieHorizontal','BowTieVertical','ButterflyWaveScrawler','CircleCrop','ColourDistance','CrazyParametricFun','CrossZoom','Directional','DoomScreenTransition','Dreamy','DreamyZoom','FilmBurn','GlitchDisplace','GlitchMemories','GridFlip','InvertedPageCurl','LinearBlur','Mosaic','PolkaDotsCurtain','Radial','SimpleZoom','StereoViewer','Swirl','ZoomInCircles','angular','burn','cannabisleaf','circle','circleopen','colorphase','crosshatch','crosswarp','cube','directionalwarp','directionalwipe','displacement','doorway','fade','fadecolor','fadegrayscale','flyeye','heart','hexagonalize','kaleidoscope','luma','luminance_melt','morph','multiply_blend','perlin','pinwheel','pixelize','polar_function','randomsquares','ripple','rotate_scale_fade','squareswire','squeeze','swap','undulatingBurnOut','wind','windowblinds','windowslice','wipeDown','wipeLeft','wipeRight','wipeUp','Sunflower'];
  const trans = ['Magnifier','Colorful','WaterWave','Stretch','BackOff','Windows4','Fat','MoveLeft','Oblique','Shake','Slice','Tetrapod','ZoomRight','FastSwitch','Fluidly','Lens','Radiation','TricolorCircle','WindowShades','Bounce','BowTieHorizontal','BowTieVertical','ButterflyWaveScrawler','CircleCrop','ColourDistance','CrazyParametricFun','CrossZoom','Directional','DoomScreenTransition','Dreamy','DreamyZoom','FilmBurn','GlitchDisplace','GlitchMemories','GridFlip','InvertedPageCurl','LinearBlur','Mosaic','PolkaDotsCurtain','Radial','SimpleZoom','StereoViewer','Swirl','ZoomInCircles','angular','burn','cannabisleaf','circle','circleopen','colorphase','crosshatch','crosswarp','cube','directionalwarp','directionalwipe','displacement','doorway','fade','fadecolor','fadegrayscale','flyeye','heart','hexagonalize','kaleidoscope','luma','luminance_melt','morph','multiply_blend','perlin','pinwheel','pixelize','polar_function','randomsquares','ripple','rotate_scale_fade','squareswire','squeeze','swap','undulatingBurnOut','wind','windowblinds','windowslice','wipeDown','wipeLeft','wipeRight','wipeUp','End'];

  // create creator instance
  const creator = new FFCreator({
    cacheDir,
    outputDir,
    width,
    height,
    //cacheFormat:'jpg',
    highWaterMark: '10mb',
    frames: 6,
    debug:  false,
  });

  for (let i = 0; i < trans.length; i++) {
    const transition = trans[i];
    const text = `${transition}`;
    const scene = creatScene({ index:i, transition, text });
    creator.addChild(scene);
  }

  //creator.openLog();
  creator.start();

  creator.on('start', () => {
    console.log(`FFCreator start`);
  });

  creator.on('error', e => {
    console.log(`FFCreator error: ${JSON.stringify(e)}`);
  });

  creator.on('progress', e => {
    // console.log(colors.yellow(`FFCreator progress: ${(e.percent * 100) >> 0}%`));
  });

  creator.on('complete', e => {
    console.log(
      colors.magenta(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `),
    );

    console.log(colors.green(`\n --- You can press the s key or the w key to restart! --- \n`));
  });

  return creator;
};

const creatScene = ({index, transition, text }) => {
  const scene = new FFScene();
  scene.setBgColor('#3b3a98');
  scene.setDuration(5);
  scene.setTransition(transition, 1.5);

  if(index%2 ===0 ){
    const fbg1 = new FFImage({ path: bg1, x: width / 2, y: height / 2 });
    scene.addChild(fbg1);
  }else{
    const fbg2 = new FFImage({ path: bg2, x: width / 2, y: height / 2 });
    scene.addChild(fbg2);
  }
  

  // title text
  const ftext = new FFText({ text, x: width / 2, y: height / 2 + 50, fontSize: 38 });
  ftext.alignCenter();
  ftext.addEffect('fadeInRight', 1, 1.3);
  ftext.setStyle({ color: '#30336b', backgroundColor: '#ffffff', padding: 10 });
  scene.addChild(ftext);

  // add logo2
  const logo = logo2;
  const flogo = new FFImage({ path: logo, x: width / 2, y: height / 2 - 100 });
  flogo.setScale(0.6);
  flogo.addEffect('fadeInLeft', 1, 1);
  scene.addChild(flogo);

  return scene;
};

FFCreatorCenter.addTask(transitionDemoTask);
