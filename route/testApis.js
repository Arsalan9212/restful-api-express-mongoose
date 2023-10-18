const { CHAT_GPT_API } = process.env;
const openai = new OpenAI({
  apiKey: CHAT_GPT_API,
});

//chatgpt function
const translateText = async (language, text) => {
  // add try catch here.
  try{
    console.log("::: ∑¥ translateText function");
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Translate to ${language}: ${text}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    return chatCompletion.choices[0].message.content;
  }catch (error) {
      console.log("error in ChatGPT function translateText", error.message);
  }
};

Agenda.define("translate-web", { concurrency: 15, lockLifetime: 3 * 60000 }, async (job, done) => {
    console.log("****************************************************************");
    console.log("***************** Translation of website Job *******************");
    console.log("****************************************************************");
    try {
      

      const orignalData = await WebTranslation.find({}).populate({
        path: "translationFieldId",
        model: TranslationFeild,
      });
      console.log(
        "🚀 ~ file: translate-web.js:42 ~ orignalData ~ orignalData:",
        orignalData
      );

      // add if condition here and fix 
      const { home, header, homeFeature, footer, contectUs, verify, shop , productDetail} =
        orignalData[0]?.translationFieldId || {};
        

      // let homeObject = {};
      // let headerObject = {};
      // let homeFeatureObject = {};
      // let footerObject = {};
      // let shopObject = {};
      // let contectUsObject = {};
      // let verifyObject = {};

        // HOME
        if (home.isChange === false) {
          const languagesToTranslate = ["fr", "es","ar","zh","pt"]; // English, French , Spanish, Portuguese, Arabic and Chinese "en", "fr", "es", "ar","zh","pt",
          let langArray = [];
          for (let i = 0; i < languagesToTranslate.length; i++) {
            let language = languagesToTranslate[i];
            let entries = Object.entries(home);
            let keysObject = {};
            for (const [key, value] of entries) {
              //chatgpt function calling
              let dis = await translateText(language, value);
              keysObject[key] = dis;
              await wait(20000);
            }
            langArray.push({ [language]: keysObject });
          }
          // array convert into object
          let langObject = langArray.reduce((result, currentObj) => {
            return { ...result, ...currentObj };
          }, {});

          // Find the WebTranslation
          const doc = await WebTranslation.findOne({});
          doc.translations.home = langObject;

          // Find the TranslationFeild
          const translationFeildDoc = await TranslationFeild.findOne({});
          translationFeildDoc.home.isChange = true;
          translationFeildDoc.markModified("home");
          // Save the TranslationFeild
          await translationFeildDoc.save();
          // Save the WebTranslation document
          await doc.save();

          // homeObject = { home: langObject };
         
        }

        // HOME FEATURE
        if (homeFeature.isChange === false) {
          const languagesToTranslate = ["fr", "es", "ar","zh","pt",]; // English, French , Spanish, Portuguese, Arabic and Chinese "en", "fr", "es", "ar","zh","pt",
          let langArray = [];
          for (let i = 0; i < languagesToTranslate.length; i++) {
            let language = languagesToTranslate[i];
            let entries = Object.entries(homeFeature);
            let keysObject = {};
            for (const [key, value] of entries) {
              //chatgpt function calling
              let dis = await translateText(language, value);
              keysObject[key] = dis;
              await wait(20000);
            }
            langArray.push({ [language]: keysObject });
          }

          // array convert into object
          const langObject = langArray.reduce((result, currentObj) => {
            return { ...result, ...currentObj };
          }, {});
              // Find the WebTranslation
          const doc = await WebTranslation.findOne({});
          doc.translations.homeFeature = langObject;

          // Find the TranslationFeild
          const translationFeildDoc = await TranslationFeild.findOne({});
          translationFeildDoc.homeFeature.isChange = true;
          translationFeildDoc.markModified("homeFeature");
          // Save the TranslationFeild
          await translationFeildDoc.save();
          // Save the WebTranslation document
          await doc.save();

          // homeFeatureObject = { homeFeature: langObject };
        }

        // HEADER
        if (header.isChange === false) {
          const languagesToTranslate = [ "fr", "es", "ar","zh","pt",]; // English, French , Spanish, Portuguese, Arabic and Chinese "en", "fr", "es", "ar","zh","pt",
          let langArray = [];
          for (let i = 0; i < languagesToTranslate.length; i++) {
            let language = languagesToTranslate[i];
            let entries = Object.entries(header);
            let keysObject = {};
            for (const [key, value] of entries) {
              //chatgpt function calling
              let dis = await translateText(language, value);
              keysObject[key] = dis;
              await wait(20000);
            }
            langArray.push({ [language]: keysObject });
          }

          // array convert into object
          const langObject = langArray.reduce((result, currentObj) => {
            return { ...result, ...currentObj };
          }, {});

              // Find the WebTranslation
              const doc = await WebTranslation.findOne({});
              doc.translations.header = langObject;
    
              // Find the TranslationFeild
              const translationFeildDoc = await TranslationFeild.findOne({});
              translationFeildDoc.header.isChange = true;
              translationFeildDoc.markModified("header");
              // Save the TranslationFeild
              await translationFeildDoc.save();
              // Save the WebTranslation document
              await doc.save();
          // headerObject = { header: langObject };
          
        }

        //FOOTER
        if (footer.isChange === false) {
          const languagesToTranslate = ["fr", "es", "ar","zh","pt",]; // English, French , Spanish, Portuguese, Arabic and Chinese "en", "fr", "es", "ar","zh","pt",
          let langArray = [];
          for (let i = 0; i < languagesToTranslate.length; i++) {
            let language = languagesToTranslate[i];
            let entries = Object.entries(footer);
            let keysObject = {};
            for (const [key, value] of entries) {
              //chatgpt function calling
              let dis = await translateText(language, value);
              keysObject[key] = dis;
              await wait(20000);
            }
            langArray.push({ [language]: keysObject });
          }

          // array convert into object
          const langObject = langArray.reduce((result, currentObj) => {
            return { ...result, ...currentObj };
          }, {});

          
          // Find the WebTranslation
          const doc = await WebTranslation.findOne({});
          doc.translations.footer = langObject;

          // Find the TranslationFeild
          const translationFeildDoc = await TranslationFeild.findOne({});
          translationFeildDoc.footer.isChange = true;
          translationFeildDoc.markModified("footer");
          // Save the TranslationFeild
          await translationFeildDoc.save();
          // Save the WebTranslation document
          await doc.save();
          

          // footerObject = { footer: langObject };
        }

        // SHOP
        if (shop.isChange === false) {
          const languagesToTranslate = ["fr", "es", "ar","zh","pt",]; // English, French , Spanish, Portuguese, Arabic and Chinese "en", "fr", "es", "ar","zh","pt",
          let langArray = [];
          for (let i = 0; i < languagesToTranslate.length; i++) {
            let language = languagesToTranslate[i];
            let entries = Object.entries(shop);
            let keysObject = {};
            for (const [key, value] of entries) {
              //chatgpt function calling
              let dis = await translateText(language, value);
              keysObject[key] = dis;
              await wait(20000);
            }
            langArray.push({ [language]: keysObject });
          }

          // array convert into object
          const langObject = langArray.reduce((result, currentObj) => {
            return { ...result, ...currentObj };
          }, {});

          // Find the WebTranslation
          const doc = await WebTranslation.findOne({});
          doc.translations.shop = langObject;

          // Find the TranslationFeild
          const translationFeildDoc = await TranslationFeild.findOne({});
          translationFeildDoc.shop.isChange = true;
          translationFeildDoc.markModified("shop");
          // Save the TranslationFeild
          await translationFeildDoc.save();
          // Save the WebTranslation document
          await doc.save();
          // shopObject = { shop: langObject };
        }

        // CONTECT US
        if (contectUs.isChange === false) {
          const languagesToTranslate = ["fr", "es", "ar","zh","pt"]; // English, French , Spanish, Portuguese, Arabic and Chinese "en", "fr", "es", "ar","zh","pt",
          let langArray = [];
          for (let i = 0; i < languagesToTranslate.length; i++) {
            let language = languagesToTranslate[i];
            let entries = Object.entries(contectUs);
            let keysObject = {};
            for (const [key, value] of entries) {
              //chatgpt function calling
              let dis = await translateText(language, value);
              keysObject[key] = dis;
              await wait(20000);
            }
            langArray.push({ [language]: keysObject });
          }

          // array convert into object
          const langObject = langArray.reduce((result, currentObj) => {
            return { ...result, ...currentObj };
          }, {});

          // Find the WebTranslation
          const doc = await WebTranslation.findOne({});
          doc.translations.contectUs = langObject;

          // Find the TranslationFeild
          const translationFeildDoc = await TranslationFeild.findOne({});
          translationFeildDoc.contectUs.isChange = true;
          translationFeildDoc.markModified("contectUs");
          // Save the TranslationFeild
          await translationFeildDoc.save();
          // Save the WebTranslation document
          await doc.save();
          // contectUsObject = { contectUs: langObject };
        }

        // VERIFY
        if (verify.isChange === false) {
          const languagesToTranslate = ["fr", "es", "ar","zh","pt",]; // English, French , Spanish, Portuguese, Arabic and Chinese "en", "fr", "es", "ar","zh","pt",
          let langArray = [];
          for (let i = 0; i < languagesToTranslate.length; i++) {
            let language = languagesToTranslate[i];
            let entries = Object.entries(verify);
            let keysObject = {};
            for (const [key, value] of entries) {
              //chatgpt function calling
              let dis = await translateText(language, value);
              keysObject[key] = dis;
              await wait(20000);
            }
            langArray.push({ [language]: keysObject });
          }

          // array convert into object
          const langObject = langArray.reduce((result, currentObj) => {
            return { ...result, ...currentObj };
          }, {});

           // Find the WebTranslation
           const doc = await WebTranslation.findOne({});
           doc.translations.verify = langObject;
 
           // Find the TranslationFeild
           const translationFeildDoc = await TranslationFeild.findOne({});
           translationFeildDoc.verify.isChange = true;
           translationFeildDoc.markModified("verify");
           // Save the TranslationFeild
           await translationFeildDoc.save();
           // Save the WebTranslation document
           await doc.save();
          // verifyObject = { verify: langObject };
        }

        // PRODUCT DETAIL 
        if (productDetail?.isChange == false) {
          const languagesToTranslate = ["ar"]; // English, French , Spanish, Portuguese, Arabic and Chinese "en", "fr", "es", "ar","zh","pt",
          let langArray = [];
          for (let i = 0; i < languagesToTranslate.length; i++) {
            let language = languagesToTranslate[i];
            let entries = Object.entries(productDetail);
            let keysObject = {};
            for (const [key, value] of entries) {
              //chatgpt function calling
              let dis = await translateText(language, value);
              keysObject[key] = dis;
              await wait(20000);
            }
            langArray.push({ [language]: keysObject });
          }

          // array convert into object
          const langObject = langArray.reduce((result, currentObj) => {
            return { ...result, ...currentObj };
          }, {});

           // Find the WebTranslation
           const doc = await WebTranslation.findOne({});
           doc.translations.productDetail = langObject;
           console.log("🚀 ~ file: translate-web.js:348 ~ langObject:", langObject)
 
           // Find the TranslationFeild
           const translationFeildDoc = await TranslationFeild.findOne({});
           translationFeildDoc.productDetail.isChange = true;
           translationFeildDoc.markModified("productDetail");
           // Save the TranslationFeild
           await translationFeildDoc.save();
           // Save the WebTranslation document
           await doc.save();
          // verifyObject = { productDetail: langObject };
        }
        
        console.log("DONE")
        //updata data
        // let fullObject = {
        //   ...homeObject,
        //   ...headerObject,
        //   ...homeFeatureObject,
        //   ...footerObject,
        //   ...shopObject,
        //   ...contectUsObject,
        //   ...verifyObject,
        // };
        // const condition = true;
        // const update = {
        //   $set: {
        //     translations: fullObject,
        //   },
        // };
        // const options = { upsert: true };
        // WebTranslation.findOneAndUpdate(condition, update, options)
        //   .then((updated) => {
        //     console.log("Updated translated Languages", updated);
        //   })
        //   .catch((error) => {
        //     console.error("Error:", error);
        //   });
      
    } catch (error) {
      console.log("*****************************************************************");
      console.log("******************** Translation of website Job RETRY *******************");
      console.log(
        "*****************************************************************"
      );
      console.log("error in translation of website data job", error.message);
      console.log("*****************************************************************");
        // add next runt at 5 minutes from now
      job.attrs.state = JOB_STATES.FAILED;
      job.attrs.failedAt = new Date();
      job.attrs.failReason = error.message;
      job.attrs.lockedAt = null;
      await job.save();
    }
    done();
  }
);

  const dbData = await TranslateWeb.find();
  const Data = dbData[0]
  console.log("🚀 ~ file: translate-web.js:19 ~ Data:", Data)
  const newData = new TranslateWeb ({
    translateWeb:  [{ language: 'en',
      onlineTransactions: "Online Transactions, Made Easy. ",
      onlineTransactions1: "Put access to the digital services and solutions you require right at your fingertips with YINN – the world’s first one-stop-shop for e-commerce, content streaming, and more.",
      searchHome:"Search Now",
      startButton:"Get Start",
      headingOne:"There’s a smarter way to buy and sell online . . .",
      paragraphOne:"Powered by advanced AI and an innovative, proprietary pricing model,",
      paragraphTwo:" brings fairness, trust, and transparency to online sales in a way that helps creators and customers alike."
    }]
});
if (newData !== Data ){
  // // Save the new data to the database
  await TranslateWeb.findOneAndDelete(Data.translateWeb);
  newData.save()
      .then(savedData => {
          console.log("Data saved to the database:", savedData);
      })
      .catch(error => {
          console.error("Error saving data:", error);
      });
}

let entries = Object.entries(Data)
let data = entries.map( ([key, val] = entry) => {
  return `${key} : ${val}`;
});

 entries.forEach(([key, value]) => {
   console.log("🚀 ~ file: translate-web.js:37 ~ entries.forEach ~ key:", key)
  console.log("🚀 ~ file: translate-web.js:35 ~ entries.forEach ~ value:", value)
  await wait(40000);
});
 }

  WebTranslation.findOne({}, (err, doc) => {
    if (err) {
      console.error("Error finding the document:", err);
      return;
    }
    doc.translations.footer = newFooter;
    // Save the updated document
    doc.save((err, updatedDoc) => {
      if (err) {
        console.error("Error saving the document:", err);
        return;
      }
      TranslationFeild.findOne({}, (err, doc) => {
        if (err) {
          console.error("Error finding the document:", err);
          return;
        }
        doc.home.isChange = true;
    });
    console.log("🚀 ~ file: translate-web.js:55 ~ doc.save ~ updatedDoc:", updatedDoc);
  })
}

// THIS IS USE FOR UPDATA ONLY SPACIFIC FIELD
const contectus = {
        zh: { page: "chanies", isChange: "hohohoho" },
        de: { page: "gogog", isChange: "偽の" },
      };
      // Find the WebTranslation
      const doc = await WebTranslation.findOne({});
      doc.translations.contectUs = contectUs; // schema translation:{contectUs{mixed}}

      // Find the TranslationFeild
      const translationFeildDoc = await TranslationFeild.findOne({});
      translationFeildDoc.homeFeature.isChange = true;
      translationFeildDoc.markModified("homeFeature");

      // Save the TranslationFeild
      const updatae = await translationFeildDoc.save();
      console.log("🚀 ~ file: translate-web.js:57 ~ updatae:", updatae);

      // Save the WebTranslation document
      const updatedDoc = await doc.save();
