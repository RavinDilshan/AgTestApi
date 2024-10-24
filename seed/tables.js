const db = require('../startup/database');

const createUsersTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(50) NOT NULL,
      lastName VARCHAR(50) NOT NULL,
      phoneNumber VARCHAR(12) NOT NULL,
      NICnumber VARCHAR(12) NOT NULL,
      profileImage LONGBLOB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating users table: ' + err);
            } else {
                resolve('Users table created successfully.');
            }
        });
    });
};

const createAdminUsersTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS adminUsers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mail VARCHAR(50) NOT NULL,
      userName VARCHAR(30) NOT NULL,
      password VARCHAR(20) NOT NULL,
      role VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating adminUsers table: ' + err);
            } else {
                resolve('adminUsers table created successfully.');
            }
        });
    });
};


const createContentTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS content (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titleEnglish TEXT NOT NULL,
      titleSinhala TEXT NOT NULL,
      titleTamil TEXT NOT NULL,
      descriptionEnglish  TEXT NOT NULL,
      descriptionSinhala TEXT NOT NULL,
      descriptionTamil TEXT NOT NULL,
      image LONGBLOB,
      status VARCHAR(15) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      createdBy INT,
      FOREIGN KEY (createdBy) REFERENCES adminUsers(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating content table: ' + err);
            } else {
                resolve('Content table created successfully.');
            }    
        });  
    });
};


const createCropCalenderTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS cropCalender (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cropName VARCHAR(50) NOT NULL,
      sinhalaCropName VARCHAR(50) NOT NULL,
      tamilCropName VARCHAR(50) NOT NULL,
      variety VARCHAR(50) NOT NULL,
      sinhalaVariety VARCHAR(50) NOT NULL,
      tamilVariety VARCHAR(50) NOT NULL,
      CultivationMethod VARCHAR(20) NOT NULL,
      NatureOfCultivation VARCHAR(25) NOT NULL,
      CropDuration VARCHAR(3) NOT NULL,
      SpecialNotes TEXT,
      sinhalaSpecialNotes TEXT,
      tamilSpecialNotes TEXT,
      image LONGBLOB,
      cropColor VARCHAR(10),
      SuitableAreas TEXT NOT NULL,
      Category VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating cropCalender table: ' + err);
            } else {
                resolve('CropCalender table created successfully.');
            }
        });
    });
};



const createCropCalenderDaysTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS cropcalendardays (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cropId INT(11) NULL,
    taskIndex INT(255) NULL,
    days INT(11) NULL,
    taskTypeEnglish TEXT COLLATE latin1_swedish_ci NULL,
    taskTypeSinhala TEXT COLLATE utf8_unicode_ci NULL,
    taskTypeTamil TEXT COLLATE utf8_unicode_ci NULL,
    taskCategoryEnglish TEXT COLLATE latin1_swedish_ci NULL,
    taskCategorySinhala TEXT COLLATE utf8_unicode_ci NULL,
    taskCategoryTamil TEXT COLLATE utf8_unicode_ci NULL,
    taskEnglish TEXT COLLATE latin1_swedish_ci NULL,
    taskSinhala TEXT COLLATE utf8_unicode_ci NULL,
    taskTamil TEXT COLLATE utf8_unicode_ci NULL,
    taskDescriptionEnglish TEXT COLLATE latin1_swedish_ci NULL,
    taskDescriptionSinhala TEXT COLLATE utf8_unicode_ci NULL,
    taskDescriptionTamil TEXT COLLATE utf8_unicode_ci NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (cropId) REFERENCES cropCalender(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating cropCalenderDays table: ' + err);
            } else {
                resolve('CropCalenderDays table created successfully.');
            }
        });
    });
};

const createOngoingCultivationsTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS ongoingCultivations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating ongoingCultivations table: ' + err);
            } else {
                resolve('OngoingCultivations table created successfully.');
            }
        });
    });
};



const createMarketPriceTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS marketprice (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titleEnglish TEXT NOT NULL,
      titleSinhala TEXT NOT NULL,
      titleTamil TEXT NOT NULL,
      descriptionEnglish TEXT NOT NULL,
      descriptionSinhala TEXT NOT NULL,
      descriptionTamil TEXT NOT NULL,
      image LONGBLOB,
      status VARCHAR(20) NOT NULL,
      price VARCHAR(5) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      createdBy INT,
      FOREIGN KEY (createdBy) REFERENCES adminUsers(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating market-price table: ' + err);
            } else {
                resolve('market-price table created successfully.');
            }
        });
    });
};


const createOngoingCultivationsCropsTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS ongoingCultivationsCrops (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ongoingCultivationId INT,
      cropCalendar INT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (ongoingCultivationId) REFERENCES ongoingCultivations(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      FOREIGN KEY (cropCalendar) REFERENCES cropCalender(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating ongoingCultivationsCrops table: ' + err);
            } else {
                resolve('OngoingCultivationsCrops table created successfully.');
            }
        });
    });
};


const createCurrentAssetTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS currentasset (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      category VARCHAR(50) NOT NULL,
      asset VARCHAR(50) NOT NULL,
      brand VARCHAR(50) NOT NULL,
      batchNum VARCHAR(50) NOT NULL,
      unit VARCHAR(10) NOT NULL,
      unitVolume INT,
      numOfUnit DECIMAL(8, 2) NOT NULL,
      unitPrice DECIMAL(8, 2) NOT NULL,
      total DECIMAL(8, 2) NOT NULL,
      purchaseDate DATETIME NOT NULL,
      expireDate DATETIME NOT NULL,
      status VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating current asset table: ' + err);
            } else {
                resolve('current asset table created successfully.');
            }
        });
    });
};

//01
const createFixedAsset = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS fixedasset (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      category VARCHAR(50) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating fixed asset table: ' + err);
            } else {
                resolve('Fixed asset table created successfully.');
            }
        });
    });
};


//02
const createBuldingFixedAsset = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS buildingfixedasset (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fixedAssetId INT,
      type VARCHAR(50) NOT NULL,
      floorArea DECIMAL(8, 2) NOT NULL,
      ownership VARCHAR(50) NOT NULL,
      generalCondition VARCHAR(50) NOT NULL,
      district VARCHAR(15) NOT NULL,
      FOREIGN KEY (fixedAssetId) REFERENCES fixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating building fixed asset table: ' + err);
            } else {
                resolve('building Fixed asset table created successfully.');
            }
        });
    });
};



//03
const createLandFixedAsset = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS landfixedasset (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fixedAssetId INT,
      extentha DECIMAL(8, 2) NOT NULL,
      extentac DECIMAL(8, 2) NOT NULL,
      extentp DECIMAL(8, 2) NOT NULL,
      ownership VARCHAR(50) NOT NULL,
      
      district VARCHAR(15) NOT NULL,
      landFenced BOOLEAN  NOT NULL,
      perennialCrop BOOLEAN  NOT NULL,
      FOREIGN KEY (fixedAssetId) REFERENCES fixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating land fixed asset table: ' + err);
            } else {
                resolve('Land fixed asset table created successfully.');
            }
        });
    });
};



//04
const createMachToolsFixedAsset = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS machtoolsfixedasset (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fixedAssetId INT,
      asset VARCHAR(50) NOT NULL,
      assetType VARCHAR(25) NOT NULL,
      mentionOther VARCHAR(50) NOT NULL,
      brand VARCHAR(25) NOT NULL,
      numberOfUnits INT NOT NULL,
      unitPrice DECIMAL(8, 2) NOT NULL,
      totalPrice DECIMAL(8, 2) NOT NULL,
      warranty VARCHAR(20) NOT NULL,
      FOREIGN KEY (fixedAssetId) REFERENCES fixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating machtools fixed asset table: ' + err);
            } else {
                resolve('machtools Fixed asset table created successfully.');
            }
        });
    });
};


//05
const createMachToolsWarrantyFixedAsset = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS machtoolsfixedassetwarranty (
      id INT AUTO_INCREMENT PRIMARY KEY,
      machToolsId INT,
      purchaseDate DATETIME NOT NULL,
      expireDate DATETIME NOT NULL,
      warrantystatus VARCHAR(20) NOT NULL,
      FOREIGN KEY (machToolsId) REFERENCES machtoolsfixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating fixed asset warranty table: ' + err);
            } else {
                resolve('Fixed asset warranty table created successfully.');
            }
        });
    });
};


//06
const createOwnershipOwnerFixedAsset = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS ownershipownerfixedasset (
      id INT AUTO_INCREMENT PRIMARY KEY,
      buildingAssetId INT NULL,
      landAssetId INT NULL,
      issuedDate DATETIME NOT NULL,
      estimateValue DECIMAL(8, 2) NOT NULL,
      FOREIGN KEY (buildingAssetId) REFERENCES buildingfixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
     FOREIGN KEY (landAssetId) REFERENCES landfixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating ownershipownerfixedasset table: ' + err);
            } else {
                resolve('ownershipownerfixedasset table created successfully.');
            }
        });
    });
};

//07
const createOwnershipLeastFixedAsset = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS ownershipleastfixedasset (
      id INT AUTO_INCREMENT PRIMARY KEY,
      buildingAssetId INT NULL,
      landAssetId INT NULL,
      startDate DATETIME NOT NULL,
      duration INT(8) NOT NULL,
      leastAmountAnnually DECIMAL(8, 2) NOT NULL,
      FOREIGN KEY (buildingAssetId) REFERENCES buildingfixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
     FOREIGN KEY (landAssetId) REFERENCES landfixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating ownershipleastfixedasset table: ' + err);
            } else {
                resolve('ownershipleastfixedasset table created successfully.');
            }
        });
    });
};


//08
const createOwnershipPermitFixedAsset = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS ownershippermitfixedasset (
      id INT AUTO_INCREMENT PRIMARY KEY,
      buildingAssetId INT NULL,
      landAssetId INT NULL,
      issuedDate DATETIME NOT NULL,
      permitFeeAnnually DECIMAL(8, 2) NOT NULL,
      FOREIGN KEY (buildingAssetId) REFERENCES buildingfixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
     FOREIGN KEY (landAssetId) REFERENCES landfixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating ownershippermitfixedasset table: ' + err);
            } else {
                resolve('ownershippermitfixedasset table created successfully.');
            }
        });
    });
};

//09
const createOwnershipSharedFixedAsset = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS ownershipsharedfixedasset (
      id INT AUTO_INCREMENT PRIMARY KEY,
      buildingAssetId INT NULL,
      landAssetId INT NULL,
      paymentAnnually DECIMAL(8, 2) NOT NULL,
      FOREIGN KEY (buildingAssetId) REFERENCES buildingfixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
     FOREIGN KEY (landAssetId) REFERENCES landfixedasset(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating ownershipsharedfixedasset table: ' + err);
            } else {
                resolve('ownershipsharedfixedasset table created successfully.');
            }
        });
    });
};


const createCurrentAssetRecord = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS currentassetrecord (
    id INT AUTO_INCREMENT PRIMARY KEY,
    currentAssetId INT(5) NOT NULL,
    numOfPlusUnit DECIMAL(8, 2) NULL,
    numOfMinUnit DECIMAL(8, 2) NULL,
    totalPrice DECIMAL(8, 2) NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (currentAssetId) REFERENCES currentasset(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating cuurent asset record table: ' + err);
            } else {
                resolve('current asset record table created successfully.');
            }
        });
    });
};





const createSlaveCropCalenderDaysTable = () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS slaveCropcalendardays (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT(11) NULL,
      cropCalendarId INT(11) NULL,
      taskIndex INT(255) NULL,
      days INT(11) NULL,
      taskTypeEnglish TEXT COLLATE latin1_swedish_ci NULL,
      taskTypeSinhala TEXT COLLATE utf8_unicode_ci NULL,
      taskTypeTamil TEXT COLLATE utf8_unicode_ci NULL,
      taskCategoryEnglish TEXT COLLATE latin1_swedish_ci NULL,
      taskCategorySinhala TEXT COLLATE utf8_unicode_ci NULL,
      taskCategoryTamil TEXT COLLATE utf8_unicode_ci NULL,
      taskEnglish TEXT COLLATE latin1_swedish_ci NULL,
      taskSinhala TEXT COLLATE utf8_unicode_ci NULL,
      taskTamil TEXT COLLATE utf8_unicode_ci NULL,
      taskDescriptionEnglish TEXT COLLATE latin1_swedish_ci NULL,
      taskDescriptionSinhala TEXT COLLATE utf8_unicode_ci NULL,
      taskDescriptionTamil TEXT COLLATE utf8_unicode_ci NULL,
      status VARCHAR(20), 
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
      FOREIGN KEY (cropCalendarId) REFERENCES cropCalender(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
  );
    `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating slave crop Calender Days table: ' + err);
            } else {
                resolve('slave crop   table created successfully.');
            }
        });
    });
};

const createpublicforumposts = () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS publicforumposts (
            id int AUTO_INCREMENT PRIMARY KEY,
            userId int NOT NULL,
            heading varchar(255) NOT NULL,
            message text NOT NULL,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            postimage longblob,
            FOREIGN KEY (userId) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
  );
    `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error publicforumposts table: ' + err);
            } else {
                resolve('publicforumposts table created successfully.');
            }
        });
    });
};

const createpublicforumreplies = () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS publicforumreplies (
        id int AUTO_INCREMENT PRIMARY KEY,
        chatId int NOT NULL,
        replyId int NOT NULL,
        replyMessage text NOT NULL,
        createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (replyId) REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        FOREIGN KEY (chatId) REFERENCES publicforumposts(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE

  );
    `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error publicforumreplies table: ' + err);
            } else {
                resolve('publicforumreplies table created successfully.');
            }
        });
    });
};




//Collection officer tables

const createCollectionOfficer = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS collectionofficer (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(50) NOT NULL,
      lastName VARCHAR(50) NOT NULL,
      phoneNumber01 VARCHAR(12) NOT NULL,
      phoneNumber02 VARCHAR(12) NOT NULL,
      image LONGBLOB,
      nic VARCHAR(12) NOT NULL,
      email VARCHAR(50) NOT NULL,
      password VARCHAR(20) NOT NULL,
      passwordUpdated  VARCHAR(20) NOT NULL,
      houseNumber VARCHAR(10) NOT NULL,
      streetName VARCHAR(50) NOT NULL,
      district VARCHAR(25) NOT NULL,
      province VARCHAR(25) NOT NULL,
      country VARCHAR(25) NOT NULL,
      languages VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating collection officer table: ' + err);
            } else {
                resolve('collection officer table created successfully.');
            }
        });
    });
};


const createCollectionOfficerCompanyDetails = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS collectionofficercompanydetails (
      id INT AUTO_INCREMENT PRIMARY KEY,
      collectionOfficerId INT,
      companyName VARCHAR(255) NOT NULL,
      jobRole VARCHAR(50) NOT NULL,
      IRMname VARCHAR(75) NOT NULL,
      managerContactNumber VARCHAR(12) NOT NULL,
      companyEmail VARCHAR(50) NOT NULL,
      assignedDistrict VARCHAR(25) NOT NULL,
      employeeType VARCHAR(25) NOT NULL,
      FOREIGN KEY (collectionOfficerId) REFERENCES collectionofficer(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating collection officer company details table: ' + err);
            } else {
                resolve('collection officer company details table created successfully.');
            }
        });
    });
};



const createCollectionOfficerBankDetails = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS collectionofficerbankdetails (
      id INT AUTO_INCREMENT PRIMARY KEY,
      collectionOfficerId INT,
      accHolderName VARCHAR(75) NOT NULL,
      accNumber VARCHAR(25) NOT NULL,
      bankName VARCHAR(25) NOT NULL,
      branchName VARCHAR(25) NOT NULL,
      FOREIGN KEY (collectionOfficerId) REFERENCES collectionofficer(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating collection bank details officer table: ' + err);
            } else {
                resolve('collection officer bank details table created successfully.');
            }
        });
    });
};


const createRegisteredFarmerPayments = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS registeredfarmerpayments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      collectionOfficerId INT,
      cropName VARCHAR(25) NOT NULL,
      quality VARCHAR(25) NOT NULL,
      unitPrice DECIMAL(8, 2) NOT NULL,
      weight INT NOT NULL,
      total DECIMAL(8, 2) NOT NULL,
      image LONGBLOB,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
      FOREIGN KEY (collectionOfficerId) REFERENCES collectionofficer(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating registeredfarmerpayments table: ' + err);
            } else {
                resolve('registeredfarmerpayments table created successfully.');
            }
        });
    });
};

const createUserBankDetails = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS userbankdetails (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      address TEXT NOT NULL,
      accNumber VARCHAR(50) NOT NULL,
      accHolderName VARCHAR(50) NOT NULL,
      bankName VARCHAR(50) NOT NULL,
      branchName VARCHAR(50) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject('Error creating userbankdetails table: ' + err);
            } else {
                resolve('userbankdetails table created successfully.');
            }
        });
    });
};


module.exports = {
    createUsersTable,
    createAdminUsersTable,
    createContentTable,
    createCropCalenderTable,
    createCropCalenderDaysTable,
    createOngoingCultivationsTable,
    createMarketPriceTable,
    createOngoingCultivationsCropsTable,
    createCurrentAssetTable,
    createpublicforumposts,
    createpublicforumreplies,

    createFixedAsset, //1
    createBuldingFixedAsset, //2
    createLandFixedAsset, //3
    createMachToolsFixedAsset, //4
    createMachToolsWarrantyFixedAsset, //5
    createOwnershipOwnerFixedAsset, //6
    createOwnershipLeastFixedAsset, //7
    createOwnershipPermitFixedAsset, //8
    createOwnershipSharedFixedAsset, //9
    createCurrentAssetRecord,


    createSlaveCropCalenderDaysTable,

    //collection officer
    createCollectionOfficer,
    createCollectionOfficerCompanyDetails,
    createCollectionOfficerBankDetails,
    createRegisteredFarmerPayments,
    createUserBankDetails
};