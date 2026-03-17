export default function transformProductData(input) {
  // Helper function to extract ratings
  const extractRatings = (ratings) => {
    return {
      total: ratings.total || '0',
      count: '1',
      average: ratings.total || '0',
      show_bars: 'yes',
      'hw-sw': ratings.hardwareAndSoftware || '0',
      display: ratings.display || '0',
      camera: ratings.camera || '0',
      design: ratings.design || '0',
      battery: ratings.battery || '0',
      memory: ratings.memory || '0',
    };
  };

  // Build transformed object
  return {
    post_type: 'aps-products',
    categories: [110], // Static category ID example
    brand: input.attributes.general.brand, // You can replace it dynamically if needed
    'aps-gallery': input.images.gallery, // Placeholder gallery IDs
    thumbnail_id: input.images.thumbnail, // Static example

    meta: {
      type: input.meta.type,
      releaseDate: input.meta.releaseDate,
      ram: input.meta.ram,
      rom: input.meta.rom,
      battery: input.meta.battery,
      display: input.meta.display,
      os: input.meta.os,
      cpu: input.meta.cpu,
      gpu: input.meta.gpu,
      colors: input.meta.colors,
      network: input.meta.network,
    },

    'aps-general': {
      title: input.title || 'Untitled Product',
      description: '',
      price: parseInt(input.basePrice, 10) || 0, // Parses basePrice into number
    },

    'aps-features': [
      {
        name: 'Display',
        icon: 'aps-icon-mobile',
        value: input.keySpecifications.display,
      },
      {
        name: 'Chipset',
        icon: 'aps-icon-ram',
        value: input.keySpecifications.chipset,
      },

      {
        name: 'Main Camera',
        icon: 'aps-icon-camera',
        value: input.keySpecifications.mainCamera,
      },
      {
        name: 'Selfie Camera',
        icon: 'aps-icon-camera',
        value: input.keySpecifications.selfieCamera,
      },
      {
        name: 'Battery',
        icon: 'aps-icon-battery',
        value: input.keySpecifications.battery,
      },
      {
        name: 'Operating System',
        icon: 'aps-icon-android',
        value: input.keySpecifications.os,
      },
    ],

    'aps-videos': [],

    'aps-rating': extractRatings(input.ratings),
    
    'aps-attr': {
      98: {
        10: input.attributes.general.deviceType,
        11: input.attributes.general.brand,
        12: input.attributes.general.model,
        13: input.attributes.general.status,
        15: input.attributes.general.price,
        14: input.attributes.general.released,
      },
      99: {
        16: input.attributes.hardwareAndSoftware.operatingSystem,
        17: input.attributes.hardwareAndSoftware.userInterface,
        18: input.attributes.hardwareAndSoftware.chipset,
        19: input.attributes.hardwareAndSoftware.cpu,
        20: input.attributes.hardwareAndSoftware.cpuCores,
        21: input.attributes.hardwareAndSoftware.architecture,
        22: input.attributes.hardwareAndSoftware.fabrication,
        23: input.attributes.hardwareAndSoftware.gpu,
      },
      100: {
        24: input.attributes.display.displayType,
        25: input.attributes.display.size,
        26: input.attributes.display.resolution,
        27: input.attributes.display.aspectRatio,
        28: input.attributes.display.pixelDensity,
        29: input.attributes.display.screenToBodyRatio,
        30: input.attributes.display.displayProtection,
        31: input.attributes.display.bezelLessDisplay,
        32: input.attributes.display.touchScreen,
        33: input.attributes.display.brightness,
        34: input.attributes.display.hdr10HdrSupport,
        35: input.attributes.display.refreshRate,
        36: input.attributes.display.notch,
        37: input.attributes.display.features,
        38: input.attributes.display.displayColors,
      },
      101: {
        26: input.attributes.mainCamera.resolution,
        37: input.attributes.mainCamera.features,
        39: input.attributes.mainCamera.cameraSetup,
        40: input.attributes.mainCamera.autofocus,
        41: input.attributes.mainCamera.ois,
        42: input.attributes.mainCamera.flash,
        43: input.attributes.mainCamera.imageResolution,
        44: input.attributes.mainCamera.settings,
        45: input.attributes.mainCamera.zoom,
        46: input.attributes.mainCamera.shootingModes,
        47: input.attributes.mainCamera.aperture,
        48: input.attributes.mainCamera.videoRecording,
        49: input.attributes.mainCamera.videoFps,
        136: input.attributes.mainCamera.imageStabilization,
      },
      102: {
        26: input.attributes.selfieCamera.resolution,
        37: input.attributes.selfieCamera.features,
        39: input.attributes.selfieCamera.cameraSetup,
        42: input.attributes.selfieCamera.flash,
        47: input.attributes.selfieCamera.aperture,
        48: input.attributes.selfieCamera.videoRecording,
        49: input.attributes.selfieCamera.videoFps,
      },
      103: {
        50: input.attributes.design.height,
        51: input.attributes.design.width,
        52: input.attributes.design.thickness,
        53: input.attributes.design.weight,
        54: input.attributes.design.build,
        55: input.attributes.design.colors,
        56: input.attributes.design.waterproof,
        57: input.attributes.design.ipRating,
        58: input.attributes.design.ruggedness,
      },
      104: {
        59: input.attributes.battery.batteryType,
        60: input.attributes.battery.capacity,
        61: input.attributes.battery.wirelessCharging,
        62: input.attributes.battery.quickCharging,
        63: input.attributes.battery.reverseCharging,
        65: input.attributes.battery.placement,
        66: input.attributes.battery.usbTypeC,
      },
      105: {
        67: input.attributes.storage.internalStorage,
        68: input.attributes.storage.storageType,
        69: input.attributes.storage.cardSlot,
        70: input.attributes.storage.ram,
        71: input.attributes.storage.ramType,
        72: input.attributes.storage.usbOtgSupport,
      },
      106: {
        73: input.attributes.networkAndConnectivity.network,
        74: input.attributes.networkAndConnectivity.simSlot,
        75: input.attributes.networkAndConnectivity.simSize,
        76: input.attributes.networkAndConnectivity.edge,
        77: input.attributes.networkAndConnectivity.gprs,
        78: input.attributes.networkAndConnectivity.volte,
        79: input.attributes.networkAndConnectivity.speed,
        80: input.attributes.networkAndConnectivity.wlan,
        81: input.attributes.networkAndConnectivity.bluetooth,
        82: input.attributes.networkAndConnectivity.gps,
        83: input.attributes.networkAndConnectivity.wiFiHotspot,
        84: input.attributes.networkAndConnectivity.nfc,
        85: input.attributes.networkAndConnectivity.usb,
        135: input.attributes.networkAndConnectivity.infrared,
      },
      107: {
        86: input.attributes.sensorsAndSecurity.lightSensor,
        87: input.attributes.sensorsAndSecurity.fingerprintSensor,
        88: input.attributes.sensorsAndSecurity.fingerprintSensorPosition,
        89: input.attributes.sensorsAndSecurity.fingerSensorType,
        90: input.attributes.sensorsAndSecurity.faceUnlock,
      },
      108: {
        91: input.attributes.multimedia.fmRadio,
        92: input.attributes.multimedia.loudspeaker,
        93: input.attributes.multimedia.alertTypes,
        94: input.attributes.multimedia.audioJack,
        95: input.attributes.multimedia.video,
        96: input.attributes.multimedia.documentReader,
        134: input.attributes.multimedia.audioFeatures,
      },
      109: {
        37: input.attributes.more.features,
        97: input.attributes.more.madeBy,
      },
    },
  };
}