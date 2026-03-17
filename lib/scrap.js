import * as cheerio from 'cheerio';
import {
  convertToGB,
  extractBatteryCapacity,
  extractDisplaySize,
  extractLargestNetwork,
  extractRamValue,
} from '../utilities/utilFunctions.js';
import getHTMLFromURL from './getHTMLFromURL.js';

async function scrap(url) {
  const html = await getHTMLFromURL(url);
  const $ = cheerio.load(html);

  const slash = url[url.length - 1] === '/';

  const imageHTML = slash
    ? await getHTMLFromURL(url + 'gallery')
    : await getHTMLFromURL(url + '/gallery');

  const $image = cheerio.load(imageHTML);

  // Get main image
  const mainImage = $('img[itemprop="image"]').attr('src');

  // All deferent colors of image
  const imageColorsArray = [];
  $image('#colors')
    .find('.small-images')
    ?.children('.small-img')
    ?.each((index, element) => {
      const child = $(element);

      const img = child.find('img');
      if (img.length > 0) {
        img.attr('src') ? imageColorsArray.push(img.attr('src')) : null;
      }
    });

  // All parts images
  const exteriorImagesArray = [];
  $image('#exterior')
    .find('.small-images')
    ?.children('.small-img')
    ?.each((index, element) => {
      const child = $(element);

      const img = child.find('img');
      if (img.length > 0) {
        img.attr('src') ? exteriorImagesArray.push(img.attr('src')) : null;
      }
    });

  // General
  const title = $('h1').text().trim();
  const price = {
    official:
      $("td:contains('Official Price')").next('td').text().trim() || false,
    unofficial:
      $("td:contains('Unofficial Price')").next('td').text().trim() || false,
  };
  const brand = $("td:contains('Brand')").next().text().trim();
  const model = $("td:contains('Model')").next().text().trim();
  const deviceType = $("td:contains('Device Type')").next().text().trim();
  const releaseDate = $("div:contains('General')")
    .next()
    .find("td:contains('Release Date')")
    .next('td')
    .text()
    .trim();

  const status = $("div:contains('General')")
    .next()
    .find("td:contains('Status')")
    .next('td')
    .text()
    .trim();

  // Key Specifications
  const keyDisplay = $('div.short-info')
    .find("span:contains('Display')")
    .next()
    .text()
    .trim();

  const backCam = $('div.short-info')
    .find("span:contains('Main Camera')")
    .next()
    .text()
    .trim()
    ? $('div.short-info')
        .find("span:contains('Main Camera')")
        .next()
        .text()
        .trim()
    : null;

  const selfieCam = $('div.short-info')
    .find("span:contains('Front Camera')")
    .next()
    .text()
    .trim()
    ? $('div.short-info')
        .find("span:contains('Front Camera')")
        .next()
        .text()
        .trim()
    : null;

  const keyCamera =
    backCam && selfieCam
      ? backCam + selfieCam
      : backCam
      ? backCam
      : selfieCam
      ? selfieCam
      : 'null';

  const keyBattery = $('div.short-info')
    .find("span:contains('Battery')")
    .next()
    .text()
    .trim();

  const keyStorage =
    'RAM ' +
    $('div.short-info').find("span:contains('RAM')").next().text().trim() +
    ' ROM ' +
    $('div.short-info').find("span:contains('Storage')").next().text().trim();

  // Hardware & Software
  const os = $("td:contains('Operating System')").next().text().trim();
  const osVersion = $("td:contains('OS Version')").next().text().trim();
  const userInterface = $("td:contains('User Interface')").next().text().trim();
  const chipset = $("td:contains('Chipset')").next().text().trim();
  const cpu = $("td:contains('CPU')")
    .filter(function () {
      return $(this).text().trim() === 'CPU'; // Ensures exact match for 'CPU'
    })
    .next()
    .text()
    .trim();
  const cpuCores = $("td:contains('CPU Cores')").next().text().trim();
  const architecture = $("td:contains('Architecture')").next().text().trim();
  const fabrication = $("td:contains('Fabrication')").next().text().trim();
  const gpu = $("td:contains('GPU')").next().text().trim();

  // Display
  const displayType = $("td:contains('Display Type')").next().text().trim();
  const screenSize = $("td:contains('Screen Size')").next().text().trim();
  const displayResolution = $("h3:contains('Display')")
    .parent()
    .next()
    .find("td:contains('Resolution')")
    .next('td')
    .text()
    .trim();
  const aspectRatio = $("td:contains('Aspect Ratio')").next().text().trim();
  const pixelDensity = $("td:contains('Pixel Density')").next().text().trim();
  const screenToBodyRatio = $("td:contains('Screen to Body Ratio')")
    .next()
    .text()
    .trim();
  const screenProtection = $("td:contains('Screen Protection')")
    .next()
    .text()
    .trim();
  const bezelLessDisplay = $("td:contains('Bezel-less Display')")
    .next()
    .text()
    .trim();
  const touchScreen = $("td:contains('Touch Screen')").next().text().trim();
  const brightness = $("td:contains('Brightness')").next().text().trim();
  const hdrSupport = $("td:contains('HDR 10 / HDR + support')")
    .next()
    .text()
    .trim();
  const refreshRate = $("td:contains('Refresh Rate')").next().text().trim();
  const notch = $("td:contains('Notch')").next().text().trim();
  const displayFeatures = $("h3:contains('Display')")
    .parent()
    .next()
    .find("td:contains('Features')")
    .next('td')
    .text()
    .trim();

  // Primary Camera
  const cameraSetup = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Camera Setup')")
    .next('td')
    .text()
    .trim();
  const cameraResolution = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Resolution')")
    .next('td')
    .text()
    .trim();

  const autofocus = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Autofocus')")
    .next('td')
    .text()
    .trim();
  const ois = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('OIS')")
    .next('td')
    .text()
    .trim();
  const flash = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Flash')")
    .next('td')
    .text()
    .trim();
  const imageResolution = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Image Resolution')")
    .next('td')
    .text()
    .trim();

  const settings = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Settings')")
    .next('td')
    .text()
    .trim();
  const zoom = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Zoom')")
    .next('td')
    .text()
    .trim();
  const shootingModes = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Shooting Modes')")
    .next('td')
    .text()
    .trim();
  const aperture = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Aperture')")
    .next('td')
    .text()
    .trim();
  const cameraFeatures = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Camera Features')")
    .next('td')
    .text()
    .trim();
  const videoRecording = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Video Recording')")
    .next('td')
    .text()
    .trim();
  const videoFPS = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Video FPS')")
    .next('td')
    .text()
    .trim();
  const imageStabilization = $("div:contains('Primary Camera')")
    .next()
    .find("td:contains('Image Stabilization')")
    .next('td')
    .text()
    .trim();

  // Selfi Camera
  const selfieCameraSetup = $("div:contains('Selfie Camera')")
    .next()
    .find("td:contains('Camera Setup')")
    .next('td')
    .text()
    .trim();

  const selfieCameraResulation = $("div:contains('Selfie Camera')")
    .next()
    .find("td:contains('Resolution')")
    .next('td')
    .text()
    .trim();

  const selfieCameraVideoRecording = $("div:contains('Selfie Camera')")
    .next()
    .find("td:contains('Video Recording')")
    .next('td')
    .text()
    .trim();

  const selfieCameraVideoFPS = $("div:contains('Selfie Camera')")
    .next()
    .find("td:contains('Video FPS')")
    .next('td')
    .text()
    .trim();

  const selfieCameraAperture = $("div:contains('Selfie Camera')")
    .next()
    .find("td:contains('Aperture')")
    .next('td')
    .text()
    .trim();

  const selfieCameraFeatures = $("div:contains('Selfie Camera')")
    .next()
    .find("td:contains('Camera Features')")
    .next('td')
    .text()
    .trim();

  const selfieCameraFlash = $("div:contains('Selfie Camera')")
    .next()
    .find("td:contains('Flash')")
    .next('td')
    .text()
    .trim();

  // Design
  const height = $("td:contains('Height')").next().text().trim();
  const width = $("td:contains('Width')").next().text().trim();
  const thickness = $("td:contains('Thickness')").next().text().trim();
  const weight = $("td:contains('Weight')").next().text().trim();
  const build = $("td:contains('Build')").next().text().trim();
  const colors = $("td:contains('Colors')").next().text().trim();
  const waterproof = $("td:contains('Waterproof')").next().text().trim();
  const ipRating = $("td:contains('IP Rating')").next().text().trim();
  const ruggedness = $("td:contains('Ruggedness')").next().text().trim();
  // Battery
  const batteryType = $("td:contains('Battery type')").next().text().trim();
  const capacity = $("td:contains('Capacity')").next().text().trim();
  const wirelessCharging = $("td:contains('Wireless Charging')")
    .next()
    .text()
    .trim();
  const quickCharging = $("td:contains('Quick Charging')").next().text().trim();
  const reverseCharging = $("td:contains('Reverse Charging')")
    .next()
    .text()
    .trim();
  const placement = $("td:contains('Placement')").next().text().trim();
  const usbTypeC = $("td:contains('USB Type-C')").next().text().trim();
  // Storage
  const internalStorage = $("td:contains('Internal Storage')")
    .next()
    .text()
    .trim();
  const storageType = $("td:contains('Storage Type')").next().text().trim();
  const cardSlot = $("td:contains('Expandable Memory')").next().text().trim();
  const usbOTG = $("td:contains('USB OTG')").next().text().trim();
  const ram = $('td')
    .filter(function () {
      return $(this).text().trim() === 'RAM';
    })
    .next()
    .text()
    .trim();

  const ramType = $("td:contains('RAM Type')").next().text().trim();
  // Network & Connectivity
  const network = $("td:contains('Network')").next().text().trim();
  const simSlot = $("td:contains('SIM Slot')").next().text().trim();
  const simSize = $("td:contains('SIM Size')").next().text().trim();
  const edge =
    $("td:contains('EDGE')").next().text().trim().includes('Available') &&
    'Yes';
  const gprs =
    $("td:contains('GPRS')").next().text().trim().includes('Available') &&
    'Yes';
  const voLTE = $("td:contains('VoLTE')").next().text().trim();
  const speed = $("td:contains('Speed')").next().text().trim();
  const wlan = $("td:contains('WLAN')").next().text().trim();
  const bluetooth = $("td:contains('Bluetooth')").next().text().trim();
  const gps = $("td:contains('GPS')").next().text().trim();
  const wifiHotspot = $("td:contains('Wi-fi Hotspot')").next().text().trim();
  const nfc = $("td:contains('NFC')").next().text().trim();
  const infrared = $("td:contains('Infrared')").next().text().trim();
  const usb = $("div:contains('Network & Connectivity')")
    .next()
    .find("td:contains('USB')")
    .next('td')
    .text()
    .trim();

  // Sensors & security
  const lightSensor = $("td:contains('Light Sensor')").next().text().trim();
  const fingerprintSensor = $("td:contains('Fingerprint Sensor')")
    .next()
    .text()
    .trim();
  const fingerSensorPosition = $("td:contains('Finger Sensor Position')")
    .next()
    .text()
    .trim();
  const fingerSensorType = $("td:contains('Finger Sensor Type')")
    .next()
    .text()
    .trim();
  const faceUnlock = $("td:contains('Face Unlock')").next().text().trim();

  //Multimedia
  const fmRadio = $("td:contains('FM Radio')").next().text().trim();
  const loudspeaker = $("td:contains('Loudspeaker')").next().text().trim();
  const alertTypes = $("td:contains('Alert Types')").next().text().trim();
  const audioJack = $("td:contains('Audio Jack')").next().text().trim();
  const audioFeatures = $("td:contains('Audio Features')").next().text().trim();
  const video = $("h3:contains('Multimedia')")
    .parent()
    .next()
    .find("td:contains('Video')")
    .next('td')
    .text()
    .trim();

  const documentReader = $("td:contains('Document Reader')")
    .next()
    .text()
    .trim();

  // More
  const madeBy = $("td:contains('Made By')").next('td').text().trim();
  const moreFeatures = $("div:contains('More')")
    .next()
    .find("td:contains('Features')")
    .next('td')
    .text()
    .trim();
    
  // Ratings
  const hardwareAndSoftwareRating = $('h3:contains("Hardware & Software")')
    .next()
    .find('.number')
    .text()
    .trim();

  const displayRating = $('h3:contains("Display")')
    .next()
    .find('.number')
    .text()
    .trim();

  const cameraRating = $('h3:contains("Cameras")')
    .next()
    .find('.number')
    .text()
    .trim();
  const designRating = $('h3:contains("Design")')
    .next()
    .find('.number')
    .text()
    .trim();
  const batteryRating = $('h3:contains("Battery")')
    .next()
    .find('.number')
    .text()
    .trim();
  const memoryRating = $('h3:contains("Memory")')
    .next()
    .find('.number')
    .text()
    .trim();

  const sum =
    Number(hardwareAndSoftwareRating) +
    Number(displayRating) +
    Number(cameraRating) +
    Number(designRating) +
    Number(batteryRating) +
    Number(memoryRating);

  const totalRating = ((sum / 60) * 10 + 0.1).toFixed(1);

  let generalPrice;
  if (price.official && price.unofficial) {
    generalPrice = `Official: ${price.official} | Unofficial: ${price.unofficial}`;
  } else if (price.official) {
    generalPrice = `Official: ${price.official}`;
  } else if (price.unofficial) {
    generalPrice = `Unofficial: ${price.unofficial}`;
  }

  const specifications = {
    basePrice: price.official
      ? price.official.replace(/\D/g, '')
      : price.unofficial
      ? price.unofficial.replace(/\D/g, '')
      : 0,

    // Meta
    meta: {
      type: 'mobile',
      releaseDate: releaseDate,
      ram: extractRamValue(ram),
      rom: convertToGB(internalStorage),
      battery: extractBatteryCapacity(keyBattery),
      display: extractDisplaySize(keyDisplay),
      os: os,
      cpu: chipset,
      gpu: gpu,
      colors: colors,
      network: extractLargestNetwork(network),
    },

    // images
    images: {
      main: mainImage,
      colors: imageColorsArray,
      exterior: exteriorImagesArray,
    },

    // Key Specifications
    keySpecifications: {
      chipset,
      os:
        os && osVersion
          ? `${os} ${osVersion}`
          : os
          ? os
          : osVersion
          ? osVersion
          : 'null',
      display: keyDisplay,
      mainCamera: backCam,
      selfieCamera: selfieCam,
      battery: keyBattery,
    },

    // Ratings
    ratings: {
      hardwareAndSoftware: hardwareAndSoftwareRating,
      display: displayRating,
      camera: cameraRating,
      design: designRating,
      battery: batteryRating,
      memory: memoryRating,
      total: totalRating,
    },

    title,
    // General
    attributes: {
      general: {
        deviceType,
        brand,
        model,
        status,
        released: releaseDate,
        bdPrice: generalPrice ? generalPrice : '',
      },
      hardwareAndSoftware: {
        operatingSystem: os + ' ' + osVersion,
        userInterface,
        chipset,
        cpu,
        cpuCores,
        architecture,
        fabrication,
        gpu,
      },
      display: {
        displayType,
        size: screenSize,
        resolution: displayResolution,
        aspectRatio,
        pixelDensity,
        screenToBodyRatio,
        displayProtection: screenProtection,
        bezelLessDisplay,
        touchScreen,
        brightness,
        hdr10HdrSupport: hdrSupport,
        refreshRate,
        notch,
        features: displayFeatures,
        displayColors: '', // messing
      },
      mainCamera: {
        cameraSetup,
        resolution: cameraResolution,
        autofocus,
        ois,
        flash,
        imageResolution,
        settings,
        zoom,
        shootingModes,
        aperture,
        features: cameraFeatures,
        videoRecording,
        videoFps: videoFPS,
        imageStabilization,
      },
      selfieCamera: {
        cameraSetup: selfieCameraSetup,
        resolution: selfieCameraResulation,
        videoRecording: selfieCameraVideoRecording,
        videoFps: selfieCameraVideoFPS,
        aperture: selfieCameraAperture,
        features: selfieCameraFeatures,
        flash: selfieCameraFlash,
      },
      design: {
        height,
        width,
        thickness,
        weight,
        build,
        colors,
        waterproof,
        ipRating,
        ruggedness,
      },
      battery: {
        batteryType,
        capacity,
        wirelessCharging,
        quickCharging,
        reverseCharging,
        placement,
        usbTypeC,
      },
      storage: {
        internalStorage,
        storageType,
        cardSlot,
        ram,
        ramType,
        usbOtgSupport: usbOTG,
      },
      networkAndConnectivity: {
        network,
        simSlot,
        simSize,
        edge,
        gprs,
        volte: voLTE,
        speed,
        wlan,
        bluetooth,
        gps,
        infrared,
        wiFiHotspot: wifiHotspot,
        nfc,
        usb,
      },
      sensorsAndSecurity: {
        lightSensor,
        fingerprintSensor,
        fingerprintSensorPosition: fingerSensorPosition,
        fingerSensorType,
        faceUnlock,
      },
      multimedia: {
        fmRadio,
        loudspeaker,
        alertTypes,
        audioJack,
        audioFeatures,
        video,
        documentReader,
      },
      more: {
        madeBy,
        features: moreFeatures,
      },
    },
  };
  return specifications;
}

export default scrap;
