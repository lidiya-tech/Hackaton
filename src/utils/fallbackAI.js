// High-Fidelity Cultural AI Fallback Engine for Warka (Offline/Demo Mode)
// Implements deep psychiatrist-grade counseling responses and dynamic scoring.

const DYNAMIC_REPLIES = {
  crisis: {
    en: {
      advice: "I hear you, and as a trained psychiatrist-counselor, I want you to know that your life is extremely valuable and you do not have to carry this heavy burden alone. Please call 911 immediately if you are in immediate physical danger, or call 952 to speak to a free, confidential live counseling helpline. How are you holding up right now? Is there anyone nearby who can sit with you?",
      micro_action: "Call the 952 free helpline or reach out to a trusted family member immediately.",
      communities: ["Anxiety & Depression Safe Space", "Loneliness & Isolation Support"]
    },
    am: {
      advice: "\u12E8\u121A\u1230\u121B\u12CE\u1275\u1295 \u12A8\u134D\u1270\u129B \u12E8\u12A0\u12A5\u121D\u122E \u132D\u1295\u1240\u1275\u1293 \u1235\u1243\u12ED \u12A5\u1295\u1228\u12F3\u1208\u1295\u1362 \u12A5\u1295\u12F0 \u12A0\u12A5\u121D\u122E \u1324\u1293 \u1263\u1208\u1219\u12EB\u1363 \u12E8\u12A5\u122D\u1235\u12CE \u12F0\u1205\u1295\u1290\u1275 \u1208\u12A5\u1294 \u1275\u120D\u1241 \u1290\u1308\u122D \u1290\u12CD\u1362 \u12A5\u1263\u12AD\u12CE\u1295 \u12A0\u1201\u1291\u1291 \u12C8\u12F0 911 (\u1208\u12F5\u1295\u1308\u1270\u129B \u12A0\u12F0\u130B) \u12C8\u12ED\u121D \u12C8\u12F0 952 (\u12E8\u1290\u133B \u12E8\u1235\u1290-\u120D\u1266\u1293 \u1240\u12CD\u1235 \u1218\u1235\u1218\u122D) \u1260\u1218\u12F0\u12C8\u120D \u12E8\u1235\u1290-\u120D\u1266\u1293 \u1263\u1208\u1219\u12EB \u12EB\u1290\u130B\u130D\u1229\u1362 \u12A0\u1201\u1295 \u1260\u12DA\u1205 \u1230\u12D3\u1275 \u12A8\u1308\u1295\u12CE \u12E8\u121A\u1206\u1295 \u12E8\u1264\u1270\u1230\u1265 \u12A0\u1263\u120D \u12C8\u12ED\u121D \u12E8\u1245\u122D\u1265 \u1309\u12A0\u12F0\u129B \u12A0\u1208?",
      micro_action: "\u12A5\u1263\u12AD\u12CE\u1295 \u12A0\u1201\u1291\u1291 \u12C8\u12F0 952 \u12E8\u1290\u133B \u1235\u120D\u12AD \u1218\u1235\u1218\u122D \u12ED\u12F0\u12CD\u1209 \u12C8\u12ED\u121D \u1208\u1245\u122D\u1265 \u1230\u12CD \u12EB\u1290\u130B\u130D\u1229\u1362",
      communities: ["\u12E8\u12F5\u1265\u122D\u1275\u1293 \u132D\u1295\u1240\u1275 \u121B\u1246\u121A\u12EB", "\u12E8\u1265\u1279\u129D\u1290\u1275\u1293 \u1218\u1308\u1208\u120D \u1218\u1241\u1241\u121A\u12EB"]
    },
    om: {
      advice: "Miira dhiphinaa fi gadda keessan ni hubanna. Akka ogeessa fayyaa sammuutti, nageenyi keessan hundarra waan caaluuf, bilbila bilisaa 952 bilbiluun gorsa ogeessaa hatattamaan argadhaa. Yoo balaan jiraate 911 bilbili. Maaloo yeroo ammaa kanatti namni si bira jiru jiraa?",
      micro_action: "Hatattamaan bilbila 952 bilbili ykn nama amantu tokkotti himi.",
      communities: ["Iddoo Nagaa Yaaddoo fi Gaddaa", "Kophaa ta'uu fi Lagatamu"]
    },
    ti: {
      advice: "\u12DD\u1235\u121D\u12D3\u12A9\u121D \u12D8\u120E \u12A8\u1262\u12F5 \u1243\u1295\u12DB\u1295 \u132D\u1295\u1240\u1275\u1295 \u1295\u122D\u12F3\u12A5 \u12A2\u1293\u1362 \u12A8\u121D \u1235\u1290-\u1213\u1233\u1265 \u12AA\u12A2\u120B \u1218\u1320\u1295\u1363 \u1205\u12ED\u12C8\u1275\u12A9\u121D \u12A0\u12DD\u12EB \u12AD\u1265\u122D\u1272 \u12A5\u12EB\u1362 \u1260\u1303\u12A9\u121D \u1205\u1302 \u1293\u1265 911 (\u1293\u12ED \u1205\u1339\u133D \u1213\u12F0\u130B) \u12C8\u12ED \u12F5\u121B \u1293\u1265 952 (\u1290\u133B \u1218\u1235\u1218\u122D \u1213\u1308\u12DD) \u1265\u121D\u12F5\u12CB\u120D \u1213\u1308\u12DD \u1228\u12AD\u1261\u1362 \u1205\u1302 \u121D\u1235 \u1218\u1295 \u12A2\u12A9\u121D \u12D8\u1208\u12A9\u121D?",
      micro_action: "\u1260\u1303\u12A9\u121D \u1205\u1302 \u1293\u1265 952 \u1290\u133B \u1218\u1235\u1218\u122D \u12F0\u12CD\u1209 \u12C8\u12ED \u121D\u1235 \u12DD\u12A5\u1218\u1295 \u1230\u1265 \u1270\u12D8\u122B\u1228\u1261\u1362",
      communities: ["\u12CD\u1211\u1235 \u1266\u1273 \u132D\u1295\u1240\u1275\u1295 \u12F5\u1265\u122D\u1275\u1295", "\u12F0\u1308\u134D \u133D\u121D\u12CB\u1295 \u1270\u1290\u133D\u120E\u1295"]
    }
  },
  psychosis: {
    en: {
      advice: "It sounds incredibly frightening to hear or see things that feel very real to you but others might not perceive. As a psychiatrist, I want to reassure you that this is a treatable medical symptom, often linked to extreme stress, severe sleep loss, or chemical imbalances in the brain. Please contact the national psychiatric helpline at 7711 for professional medical guidance. When did you first notice these experiences?",
      micro_action: "Minimize bright screens, rest in a quiet, dark room, and dial 7711 for psychiatric support.",
      communities: ["Chronic Illness Circle", "Anxiety & Depression Safe Space"]
    },
    am: {
      advice: "\u120C\u120E\u127D \u12E8\u121B\u12ED\u1230\u1219\u1275\u1295 \u12F5\u121D\u133D \u1218\u1235\u121B\u1275 \u12C8\u12ED\u121D \u12E8\u121B\u12EB\u12E9\u1275\u1295 \u1290\u1308\u122D \u121B\u12E8\u1275 \u1260\u1323\u121D \u12A0\u1235\u134D\u122A \u12A5\u1295\u12F0\u1206\u1290 \u12A5\u1295\u1228\u12F3\u1208\u1295\u1362 \u12A5\u1295\u12F0 \u12A0\u12A5\u121D\u122E \u1210\u12AA\u121D\u1363 \u12ED\u1205 \u120A\u1273\u12A8\u121D \u12E8\u121A\u127D\u120D \u12E8\u1205\u12AD\u121D\u1293 \u121D\u120D\u12AD\u1275 \u12A5\u1295\u12F0\u1206\u1290 \u12A5\u1293 \u1260\u12A8\u134D\u1270\u129B \u12CD\u1325\u1228\u1275 \u12C8\u12ED\u121D \u1260\u12A5\u1295\u1245\u120D\u134D \u12A5\u1325\u1228\u1275 \u120A\u12A8\u1230\u1275 \u12A5\u1295\u12F0\u121A\u127D\u120D \u120B\u1228\u130B\u130D\u133D\u120D\u12CE \u12A5\u12C8\u12F3\u1208\u1201\u1362 \u12A5\u1263\u12AD\u12CE\u1295 \u12C8\u12F0 7711 \u1260\u1218\u12F0\u12C8\u120D \u12E8\u1263\u1208\u1219\u12EB \u121D\u12AD\u122D \u12EB\u130D\u1229\u1362 \u12ED\u1205 \u1235\u121C\u1275 \u1218\u127C \u1290\u12CD \u12E8\u1300\u1218\u1228\u12CE\u1275?",
      micro_action: "\u1235\u12AD\u122A\u1295 \u12EB\u1325\u1349\u1363 \u1338\u1325 \u1263\u1208 \u12AD\u134D\u120D \u12CD\u1235\u1325 \u12EB\u122D\u1349 \u12A5\u1293 \u12C8\u12F0 7711 \u12F0\u12CD\u1208\u12CD \u12EB\u121B\u12AD\u1229\u1362",
      communities: ["\u12E8\u1228\u1305\u121D \u130A\u12DC \u1205\u1218\u121D\u1270\u129E\u127D \u12AD\u1260\u1265", "\u12E8\u12F5\u1265\u122D\u1275\u1293 \u132D\u1295\u1240\u1275 \u121B\u1246\u121A\u12EB"]
    },
    om: {
      advice: "Sagalee ykn waan namni biraa hin argine argun baay'ee sodachisaa ta'uu danda'a. Kuni dhibee yaalamuu danda'udha. Hama yaaddoo ykn hiriiba dhabuu irra fiduu danda'a. Maaloo bilbila 7711 bilbiluun gorsa ogeessaa argadhaa. Kuni yoom jalqabe?",
      micro_action: "Bilbila fi iskriinii cufii boqodhu, ogeessa fayyaa 7711 bilbili.",
      communities: ["Hawaasa Dhukkuba Yeroo Dheeraa", "Iddoo Nagaa Yaaddoo fi Gaddaa"]
    },
    ti: {
      advice: "\u12AB\u120D\u12A6\u1275 \u12D8\u12ED\u1230\u121D\u12D5\u12CE \u12F5\u121D\u133A \u121D\u1235\u121D\u12D5 \u12C8\u12ED \u12D8\u12ED\u122D\u12A5\u12ED\u12CE \u1290\u1308\u122D \u121D\u122D\u12A3\u12ED \u12A0\u12DD\u12E9 \u12D8\u134D\u122D\u1215 \u12A8\u121D\u12DD\u12BE\u1290 \u1295\u130D\u1295\u12D8\u1265\u1362 \u12A8\u121D \u1293\u12ED \u12A0\u12A5\u121D\u122E \u1213\u12AA\u121D \u1218\u1320\u1295\u1363 \u12A5\u12DA \u12AD\u1215\u12A8\u121D \u12DD\u12AD\u12A5\u120D \u1293\u12ED \u1215\u12AD\u121D\u1293 \u121D\u120D\u12AD\u1275 \u12A5\u12E9\u1362 \u1260\u1303\u12A9\u121D \u1293\u1265 7711 \u12F0\u12CA\u120D\u12A9\u121D \u1293\u12ED \u12AA\u12A2\u120B \u121D\u12AD\u122A \u1228\u12AD\u1261\u1362 \u12A5\u12DA \u121D\u120D\u12AD\u1275 \u1218\u12D3\u1235 \u1300\u121A\u1229\u12A9\u121D?",
      micro_action: "\u1274\u120C\u134E\u1295 \u12A0\u1325\u134A\u12A5\u12A9\u121D \u12A0\u1265 \u1338\u1325\u1273 \u12D8\u1208\u12CE \u12AD\u134D\u120A \u12D5\u1228\u134D\u1272 \u130D\u1260\u1229\u1363 \u1293\u1265 7711 \u12F0\u12CD\u1209",
      communities: ["\u12AD\u1266 \u1293\u12ED \u1290\u12CA\u1215 \u12A5\u12CB\u1295 \u1215\u1219\u121B\u1275", "\u12CD\u1211\u1235 \u1266\u1273 \u132D\u1295\u1240\u1275\u1295 \u12F5\u1265\u122D\u1275\u1295"]
    }
  },
  illegal: {
    en: {
      advice: "Feeling unsafe or witnessing illegal, violent, or threatening situations can trigger intense distress and physiological panic. As a counselor, your physical safety and mental peace are my highest priorities. If you are under immediate physical threat, please dial 911 immediately. If you need mental support or guidance on how to navigate this stress, please call 7711. How can I help you feel safer today?",
      micro_action: "Ensure you are in a safe, secure environment. Dial 911 for emergencies or 7711 for wellness guidance.",
      communities: ["Abuse & Trauma Survivors", "Anxiety & Depression Safe Space"]
    },
    am: {
      advice: "\u12F0\u1205\u1295\u1290\u1275 \u121B\u1323\u1275 \u12C8\u12ED\u121D \u1205\u1308-\u12C8\u1325/\u12A0\u1235\u134D\u122A \u12F5\u122D\u130A\u1276\u127D\u1295 \u1218\u1218\u120D\u12A8\u1275 \u12A8\u134D\u1270\u129B \u132D\u1295\u1240\u1275\u1293 \u134D\u122D\u1203\u1275 \u12ED\u134D\u1320\u122B\u120D\u1362 \u12A5\u1295\u12F0 \u12A0\u121B\u12AB\u122A\u1363 \u12E8\u12A5\u122D\u1235\u12CE \u12E8\u12A0\u12A5\u121D\u122E \u1230\u120B\u121D \u12A5\u1293 \u12A0\u12AB\u120B\u12CA \u12F0\u1205\u1295\u1290\u1275 \u1208\u12A5\u1294 \u1275\u120D\u1245 \u12CB\u130B \u12A0\u120B\u1278\u12CD\u1362 \u1260\u12A0\u1201\u1291 \u1230\u12D3\u1275 \u1260\u12A0\u12AB\u120B\u12CA \u12A0\u12F0\u130B \u12CD\u1235\u1325 \u12A8\u1206\u1291 \u12C8\u12F0 911 \u12ED\u12F0\u12CD\u1209\u1362 \u1235\u1290-\u120D\u1266\u1293\u12CA \u12F5\u130B\u134D \u1208\u121B\u130D\u1298\u1275 \u12F0\u130D\u121E \u12C8\u12F0 7711 \u12ED\u12F0\u12CD\u1209\u1362 \u12F0\u1205\u1295\u1290\u1275 \u12A5\u1295\u12F2\u1230\u121B\u12CE\u1275 \u121D\u1295 \u121B\u12F5\u1228\u130D \u12A5\u127D\u120B\u1208\u1201?",
      micro_action: "\u12F0\u1205\u1295\u1290\u1271 \u12E8\u1270\u1320\u1260\u1240 \u1266\u1273 \u1218\u1206\u1295\u12CE\u1295 \u12EB\u1228\u130B\u130D\u1339\u1362 \u1208\u12A0\u12F0\u130B 911\u1363 \u1208\u1235\u1290-\u120D\u1266\u1293 \u12F5\u130B\u134D 7711 \u12ED\u12F0\u12CD\u1209\u1362",
      communities: ["\u12E8\u1325\u1243\u1275\u1293 \u12E8\u1235\u1290-\u12A0\u12A5\u121D\u122E \u1241\u1235\u120D \u12A0\u1238\u1293\u134A\u12CE\u127D", "\u12E8\u12F5\u1265\u122D\u1275\u1293 \u132D\u1295\u1240\u1275 \u121B\u1246\u121A\u12EB"]
    },
    om: {
      advice: "Nageenya dhabuun ykn hojii seeraan alaa argun dhiphina guddaa fida. Akka gorsaatti, nageenyi qaama fi sammuu keetii murteessadha. Balaa mudateef 911 bilbili, deeggarsa sammuuf 7711 fayyadami. Tasgabbaa'uuf maaltu si gargaara?",
      micro_action: "Bakka nagaa qabu gadi bahi. Dhimma hatattamaaf 911, deeggarsaaf 7711 bilbili.",
      communities: ["Baraaramtoota Miidhamaa", "Iddoo Nagaa Yaaddoo fi Gaddaa"]
    },
    ti: {
      advice: "\u12F5\u1215\u1290\u1275 \u121D\u1235\u12A3\u1295 \u12C8\u12ED \u130A\u1309\u12ED \u1270\u130D\u1263\u122B\u1275 \u121D\u122D\u12A3\u12ED \u120D\u12D1\u120D \u132D\u1295\u1240\u1275\u1295 \u134D\u122D\u1203\u1275\u1295 \u12ED\u134D\u1320\u122D\u1362 \u12A8\u121D \u12A0\u121B\u12EB\u12A8\u122A \u1218\u1320\u1295\u1363 \u1293\u12ED \u12A0\u12A5\u121D\u122E \u1230\u120B\u121D\u12A9\u121D\u1295 \u12A0\u12AB\u120B\u12CA \u12F5\u1215\u1290\u1275\u12A9\u121D\u1295 \u12D3\u1262 \u12CB\u130B \u12A0\u1208\u12CE\u1362 \u12A0\u1265 \u1213\u12F0\u130B \u12A5\u1295\u1270\u1208\u12A9\u121D 911 \u12F0\u12CD\u1209\u1363 \u1235\u1290-\u120D\u1266\u1293\u12CA \u1213\u1308\u12DD \u1295\u121D\u122D\u12AB\u1265 7711 \u12F0\u12CD\u1209",
      micro_action: "\u12CD\u1211\u1235 \u1266\u1273 \u121D\u1205\u120B\u12CD\u12A9\u121D \u12A0\u1228\u130B\u130D\u1339\u1362 \u1295\u1213\u12F0\u130B 911\u1363 \u1295\u1213\u1308\u12DD 7711 \u12F0\u12CD\u1209",
      communities: ["\u1270\u12D3\u12C8\u1272 \u1338\u1308\u121B\u1275\u1295 \u121B\u1205\u1230\u12ED\u1272\u1295", "\u12CD\u1211\u1235 \u1266\u1273 \u132D\u1295\u1240\u1275\u1295 \u12F5\u1265\u122D\u1275\u1295"]
    }
  }
};

const PROFESSIONS = [
  { id: "doctors", en: "Doctors & physicians", am: "\u1210\u12AA\u121E\u127D \u12A5\u1293 \u12F6\u12AD\u1270\u122E\u127D", om: "Ogeeyyii Yaalaa fi Doktoroota", ti: "\u1213\u12AB\u12ED\u121D\u1295 \u12F6\u12AD\u1270\u122B\u1275\u1295" },
  { id: "nurses", en: "Nurses & midwives", am: "\u1290\u122D\u1236\u127D \u12A5\u1293 \u12A0\u12CB\u120B\u1306\u127D", om: "Narsoota fi Hojjettoota Da'umsaa", ti: "\u1290\u122D\u1235\u1273\u1275\u1295 \u1218\u1205\u1228\u1235\u1275\u1295" },
  { id: "pharmacists", en: "Pharmacists", am: "\u12E8\u1218\u12F5\u1213\u1292\u1275 \u1263\u1208\u1219\u12EB\u12CE\u127D", om: "Ogeeyyii Qorichaa", ti: "\u1230\u1265 \u121E\u12EB \u134D\u12CD\u1232" },
  { id: "therapists", en: "Therapists & counselors", am: "\u12E8\u1235\u1290-\u120D\u1266\u1293 \u1263\u1208\u1219\u12EB\u12CE\u127D\u1293 \u12A0\u121B\u12AB\u122A\u12CE\u127D", om: "Ogeeyyii Fayyaa Sammuu", ti: "\u1293\u12ED \u1235\u1290-\u1213\u1233\u1265 \u1230\u1265 \u121E\u12EB\u1295 \u12A0\u121B\u12A8\u122D\u1275\u1295" },
  { id: "teachers", en: "Teachers & lecturers", am: "\u1218\u121D\u1205\u122B\u1295 \u12A5\u1293 \u1228\u12F3\u1275 \u1355\u122E\u134C\u1230\u122E\u127D", om: "Barsiisota fi Lektaroota", ti: "\u1218\u121D\u1205\u122B\u1295\u1295 \u1218\u121D\u1205\u122B\u1295 \u12E9\u1292\u1268\u122D\u1232\u1272\u1295" },
  { id: "directors", en: "School directors & principals", am: "\u12E8\u1275\u121D\u1205\u122D\u1275 \u1264\u1275 \u122D\u12D5\u1230-\u1218\u121D\u1205\u122B\u1295", om: "Daarekteroota Mana Barumsaa", ti: "\u122D\u12A5\u1230 \u1218\u121D\u1205\u122B\u1295" },
  { id: "lawyers", en: "Lawyers & judges", am: "\u1320\u1260\u1246\u127D \u12A5\u1293 \u12F3\u129E\u127D", om: "Abukaatota fi Abbootii Seeraa", ti: "\u1320\u1260\u1243\u1273\u1275\u1295 \u12F3\u129B\u1273\u1275\u1295" },
  { id: "bankers", en: "Bankers & finance officers", am: "\u1263\u1295\u12A8\u129E\u127D\u1293 \u12E8\u134B\u12ED\u1293\u1295\u1235 \u1263\u1208\u1219\u12EB\u12CE\u127D", om: "Hojjettoota Baankii fi Finaansii", ti: "\u1230\u122B\u1215\u1270\u129B\u1273\u1275 \u1263\u1295\u12AD\u1295 \u134B\u12ED\u1293\u1295\u1235\u1295" },
  { id: "engineers", en: "Software engineers & IT", am: "\u12E8\u1236\u134D\u1275\u12CC\u122D \u1218\u1210\u1295\u12F2\u1236\u127D\u1293 \u12A0\u12ED\u1272", om: "Ogeeyyii Pirogramiing fi IT", ti: "\u1293\u12ED \u1236\u134D\u1275\u12CC\u122D \u1218\u1203\u1295\u12F5\u1233\u1275\u1295 \u12A0\u12ED\u1272\u1295" },
  { id: "entrepreneurs", en: "Entrepreneurs", am: "\u1235\u122B \u134D\u1320\u122A\u12CE\u127D", om: "Hundeeffatoota Hojii", ti: "\u1235\u122B\u1215 \u134D\u1320\u122D\u1272" },
  { id: "traders", en: "Business owners & traders", am: "\u12E8\u1295\u130D\u12F5 \u12F5\u122D\u1305\u1275 \u1263\u1208\u1264\u1276\u127D\u1293 \u1290\u130B\u12F4\u12CE\u127D", om: "Abbootii Qabeenyaa fi Daldaltoota", ti: "\u1290\u130B\u12F6\u1275\u1295 \u12CB\u1293\u1273\u1275 \u1275\u12AB\u120B\u1275\u1295" },
  { id: "factory_workers", en: "Factory workers", am: "\u12E8\u134B\u1265\u122A\u12AB \u1230\u122B\u1270\u129E\u127D", om: "Hojjettoota Faabrikaa", ti: "\u1230\u122B\u1215\u1270\u129B\u1273\u1275 \u134B\u1265\u122A\u12AB" },
  { id: "drivers", en: "Drivers & logistics workers", am: "\u12A0\u123D\u12A8\u122D\u12AB\u122A\u12CE\u127D\u1293 \u12E8\u120E\u1305\u1235\u1272\u12AD\u1235 \u1230\u122B\u1270\u129E\u127D", om: "Konkolaachistoota fi Logistiksii", ti: "\u12A0\u12CB\u12AD\u1265\u1275\u1295 \u1230\u122B\u1215\u1270\u129B\u1273\u1275 \u120E\u1302\u1235\u1272\u12AD\u1235\u1295" },
  { id: "construction", en: "Construction workers", am: "\u12E8\u130D\u1295\u1263\u1273 \u1230\u122B\u1270\u129E\u127D", om: "Hojjettoota Gamoo fi Ijaarsaa", ti: "\u1230\u122B\u1215\u1270\u129B\u1273\u1275 \u1205\u1295\u133B" },
  { id: "farmers", en: "Farmers", am: "\u12A0\u122D\u1236 \u12A0\u12F0\u122E\u127D", om: "Qonnaan Bulaa", ti: "\u1213\u1228\u1235\u1276\u1275" },
  { id: "market_vendors", en: "Market traders & vendors", am: "\u12E8\u1308\u1260\u12EB \u1290\u130B\u12F4\u12CE\u127D\u1293 \u1278\u122D\u1307\u122A\u12CE\u127D", om: "Daldaltoota Gabaa", ti: "\u1278\u122D\u1307\u122A\u1272 \u12F1\u12AB\u1295" },
  { id: "artists", en: "Artists & creatives", am: "\u12A0\u122D\u1272\u1235\u1276\u127D\u1293 \u12E8\u134D\u1320\u122B \u1263\u1208\u1219\u12EB\u12CE\u127D", om: "Ogeeyyii Aartii fi Kalaqaa", ti: "\u1235\u1290-\u1325\u1260\u1260\u129B\u1273\u1275\u1295 \u134D\u1320\u122D\u1275\u1295" },
  { id: "journalists", en: "Media & journalists", am: "\u12E8\u121A\u12F2\u12EB \u12A5\u1293 \u130B\u12DC\u1320\u129E\u127D", om: "Midiyaa fi Gaazexeessitoota", ti: "\u130B\u12DC\u1320\u129B\u1273\u1275\u1295 \u121A\u12F5\u12EB\u1273\u1275\u1295" },
  { id: "chefs", en: "Chefs & food workers", am: "\u124C\u134E\u127D\u1293 \u12E8\u121D\u130D\u1265 \u12DD\u130D\u1305\u1275 \u1230\u122B\u1270\u129E\u127D", om: "Kukkiirran fi Hojjettoota Nyaataa", ti: "\u12AD\u123D\u1290\u1273\u1275\u1295 \u1230\u122B\u1215\u1270\u129B\u1273\u1275 \u1218\u130D\u1265\u1295" },
  { id: "textile_workers", en: "Textile workers", am: "\u12E8\u1328\u122D\u1243\u1328\u122D\u1245 \u1230\u122B\u1270\u129E\u127D", om: "Hojjettoota Uffataa fi Huccuu", ti: "\u1230\u122B\u1215\u1270\u129B\u1273\u1275 \u12D3\u1208\u1263" },
  { id: "police", en: "Police & security", am: "\u1356\u120A\u1235 \u12A5\u1293 \u12E8\u12F0\u1205\u1295\u1290\u1275 \u1230\u122B\u1270\u129E\u127D", om: "Poolisii fi Nageenya", ti: "\u1356\u120A\u1235\u1295 \u1213\u1208\u12CD\u1272 \u12F5\u1215\u1290\u1275\u1295" },
  { id: "firefighters", en: "Firefighters", am: "\u12A5\u1233\u1275 \u12A0\u12F0\u130B \u1230\u122B\u1270\u129E\u127D", om: "Hojjettoota Balaa Tasaa", ti: "\u1230\u122B\u1215\u1270\u129B\u1273\u1275 \u121D\u12AD\u120D\u12AB\u120D \u1213\u12CA" },
  { id: "religious_leaders", en: "Religious leaders", am: "\u12E8\u1203\u12ED\u121B\u1296\u1275 \u12A0\u1263\u1276\u127D\u1293 \u1218\u122A\u12CE\u127D", om: "Luboota fi Abbootii Amantaa", ti: "\u1218\u122B\u1215\u1272 \u1203\u12ED\u121B\u1296\u1275" },
  { id: "domestic_workers", en: "Domestic workers", am: "\u12E8\u1264\u1275 \u12CD\u1235\u1325 \u1230\u122B\u1270\u129E\u127D", om: "Hojjettoota Mana Keessaa", ti: "\u1230\u122B\u1215\u1270\u129B\u1273\u1275 \u12CD\u123D\u1322 \u1308\u12DB" },
  { id: "politicians", en: "Politicians", am: "\u1356\u1208\u1272\u12A8\u129E\u127D", om: "Siyaasessitoota", ti: "\u1356\u1208\u1272\u12A8\u129B\u1273\u1275" },
  { id: "scientists", en: "Scientists & researchers", am: "\u1233\u12ED\u1295\u1272\u1235\u1276\u127D\u1293 \u1270\u1218\u122B\u121B\u122A\u12CE\u127D", om: "Saayintistoota fi Qorattoota", ti: "\u1270\u1218\u122B\u1218\u122D\u1275\u1295 \u1233\u12ED\u1295\u1272\u1235\u1273\u1275\u1295" },
  { id: "athletes", en: "Athletes & coaches", am: "\u12A0\u1275\u120C\u1276\u127D \u12A5\u1293 \u12A0\u1230\u120D\u1323\u129E\u127D", om: "Atleetota fi Leenjistoota", ti: "\u12A0\u1275\u120C\u1273\u1275\u1295 \u1218\u1208\u121B\u1218\u12F5\u1275\u1295" },
  { id: "students", en: "Students & interns", am: "\u1270\u121B\u122A\u12CE\u127D \u12A5\u1293 \u1230\u120D\u1323\u129E\u127D", om: "Barattoota fi Shaakaltoota", ti: "\u1270\u121D\u1213\u122E\u1295 \u1230\u120D\u1323\u1296\u127D\u1295" }
];

const LIFE_STAGES = [
  { id: "children", nameEn: "Children (Age 5-12)", nameAm: "\u120D\u1306\u127D (\u12A85-12 \u12D3\u1218\u1275)", nameOm: "Daa'imman (Umrii 5-12)", nameTi: "\u1205\u133B\u1293\u1275 (\u12D5\u12F5\u1218 5-12)" },
  { id: "teenagers", nameEn: "Teenagers (Age 13-19)", nameAm: "\u12C8\u1323\u1276\u127D (\u12A813-19 \u12D3\u1218\u1275)", nameOm: "Dargaggoota (Umrii 13-19)", nameTi: "\u1290\u12A5\u123D\u1271 \u12C8\u1323\u1273\u1275 (\u12D5\u12F5\u1218 13-19)" },
  { id: "young_adults", nameEn: "Young Adults (Age 20-30)", nameAm: "\u130E\u120D\u121B\u1236\u127D (\u12A820-30 \u12D3\u1218\u1275)", nameOm: "Dargaggoota Cichoo (Umrii 20-30)", nameTi: "\u1218\u1295\u12A5\u1230\u12EB\u1275 (\u12D5\u12F5\u1218 20-30)" },
  { id: "women", nameEn: "Women (All ages)", nameAm: "\u1234\u1276\u127D (\u1260\u1201\u1209\u121D \u12A5\u12F5\u121C)", nameOm: "Dubartoota (Umrii hundumaa)", nameTi: "\u12F0\u1242 \u12A0\u1295\u1235\u1275\u12EE (\u12A9\u1209 \u12D5\u12F5\u1218)" },
  { id: "men", nameEn: "Men (All ages)", nameAm: "\u12C8\u1295\u12F6\u127D (\u1260\u1201\u1209\u121D \u12A5\u12F5\u121C)", nameOm: "Dhiira (Umrii hundumaa)", nameTi: "\u12F0\u1242 \u1270\u1263\u12D5\u1275\u12EE (\u12A9\u1209 \u12D5\u12F5\u1218)" },
  { id: "mothers", nameEn: "Mothers (All ages)", nameAm: "\u12A5\u1293\u1276\u127D (\u1260\u1201\u1209\u121D \u12A5\u12F5\u121C)", nameOm: "Haadhotii (Umrii hundumaa)", nameTi: "\u12D5\u12F4\u1273\u1275 (\u12A9\u1209 \u12D5\u12F5\u1218)" },
  { id: "fathers", nameEn: "Fathers (All ages)", nameAm: "\u12A0\u1263\u1276\u127D (\u1260\u1201\u1209\u121D \u12A5\u12F5\u121C)", nameOm: "Abbootii (Umrii hundumaa)", nameTi: "\u12A0\u1266\u1273\u1275 (\u12A9\u1209 \u12D5\u12F5\u1218)" },
  { id: "elderly", nameEn: "Elderly (Age 60+)", nameAm: "\u12A0\u12DB\u12CD\u1295\u1275 (\u12D5\u12F5\u121C 60+)", nameOm: "Jaarsolii (Umrii 60+)", nameTi: "\u12A0\u1228\u130B\u12CD\u12EB\u1295 (\u12D5\u12F5\u1218 60+)" }
];

export const getFallbackCheckIn = (message, history, profile, lang) => {
  const msgLower = (message || "").toLowerCase();
  const selectedLang = ['am', 'om', 'ti', 'en'].includes(lang) ? lang : 'en';

  // Helper: get localized profession label
  const getProfLabel = () => {
    if (profile.customProfession && profile.customProfession.trim()) return profile.customProfession.trim();
    const p = PROFESSIONS.find(x => x.id === profile.profession);
    if (p) {
      if (selectedLang === 'am') return p.am;
      if (selectedLang === 'om') return p.om || p.en;
      if (selectedLang === 'ti') return p.ti || p.am || p.en;
      return p.en;
    }
    return "professional";
  };

  // Helper: get localized age label
  const getAgeLabel = () => {
    if (profile.customAgeGroup && profile.customAgeGroup.trim()) return profile.customAgeGroup.trim();
    const s = LIFE_STAGES.find(x => x.id === profile.ageGroup);
    if (s) {
      if (selectedLang === 'am') return s.nameAm;
      if (selectedLang === 'om') return s.nameOm;
      if (selectedLang === 'ti') return s.nameTi;
      return s.nameEn;
    }
    return "adult";
  };

  // --- 1. EMERGENCY SAFETY (bypasses all greetings) ---
  const isCrisis = msgLower.includes("suicide") || msgLower.includes("kill myself") || msgLower.includes("want to die") || msgLower.includes("self-harm") || msgLower.includes("end my life") || msgLower.includes("\u122B\u1234\u1295 \u121B\u1325\u134B\u1275") || msgLower.includes("\u122B\u1234\u1295 \u120D\u130D\u12F0\u120D") || msgLower.includes("\u121E\u1275") || msgLower.includes("\u12A5\u121E\u1273\u1208\u1201") || msgLower.includes("\u1205\u12ED\u12C8\u1274\u1295") || msgLower.includes("lubbuu") || msgLower.includes("du'uu") || msgLower.includes("emergency");

  if (isCrisis) {
    return { advice: DYNAMIC_REPLIES.crisis[selectedLang].advice, score: 10, label: selectedLang === 'en' ? "Crisis" : "\u12A0\u1235\u1278\u12B3\u12ED \u1201\u1294\u1273", micro_action: DYNAMIC_REPLIES.crisis[selectedLang].micro_action, communities: DYNAMIC_REPLIES.crisis[selectedLang].communities };
  }

  const isPsychosis = msgLower.includes("voice") || msgLower.includes("voices") || msgLower.includes("hear things") || msgLower.includes("hearing things") || msgLower.includes("seeing things") || msgLower.includes("hallucination") || msgLower.includes("\u12F5\u121D\u133D \u12ED\u1230\u121B\u129B\u120D") || msgLower.includes("sagalee");

  if (isPsychosis) {
    return { advice: DYNAMIC_REPLIES.psychosis[selectedLang].advice, score: 25, label: selectedLang === 'en' ? "Crisis" : "\u12A0\u1235\u1278\u12B3\u12ED \u1201\u1294\u1273", micro_action: DYNAMIC_REPLIES.psychosis[selectedLang].micro_action, communities: DYNAMIC_REPLIES.psychosis[selectedLang].communities };
  }

  const isIllegal = msgLower.includes("illegal") || msgLower.includes("threat") || msgLower.includes("steal") || msgLower.includes("abuse") || msgLower.includes("violence") || msgLower.includes("crime") || msgLower.includes("kill") || msgLower.includes("killing") || msgLower.includes("killed") || msgLower.includes("murder") || msgLower.includes("attack") || msgLower.includes("danger") || msgLower.includes("harm") || msgLower.includes("assault") || msgLower.includes("\u1205\u1308-\u12C8\u1325") || msgLower.includes("\u1325\u1243\u1275") || msgLower.includes("\u1218\u130D\u12F0\u120D") || msgLower.includes("\u12A5\u12E8\u1308\u12F0\u1208") || msgLower.includes("yakka") || msgLower.includes("miidham");

  if (isIllegal) {
    return { advice: DYNAMIC_REPLIES.illegal[selectedLang].advice, score: 30, label: selectedLang === 'en' ? "High stress" : "\u12A8\u134D\u1270\u129B \u132D\u1295\u1240\u1275", micro_action: DYNAMIC_REPLIES.illegal[selectedLang].micro_action, communities: DYNAMIC_REPLIES.illegal[selectedLang].communities };
  }

  // --- 2. GREETING HANDLER ---
  const greetWords = ["hello", "hi", "hey", "selam", "\u1230\u120B\u121D", "hola", "habari", "\u12CB\u122D\u12AB", "warka", "good morning", "good afternoon", "good evening", "yo"];
  const cleanMsg = msgLower.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").trim();
  if (greetWords.includes(cleanMsg) || cleanMsg === "") {
    return {
      advice: { en: "Hello! I am Warka, your digital wellness counselor. How can I help you today?", am: "\u1230\u120B\u121D! \u12A5\u1294 \u12CB\u122D\u12AB \u1290\u129D\u1362 \u12DB\u1228 \u12A5\u1295\u12F4\u1275 \u120D\u1228\u12F3\u12CE\u1275 \u12A5\u127D\u120B\u1208\u1201?", om: "Akkam! Maqaan koo Warka. Har'a akkamitti si gargaaruu danda'a?", ti: "\u1230\u120B\u121D! \u12A0\u1290 \u12CB\u122D\u12AB \u12A5\u12E8\u1362 \u120E\u121A \u12A8\u1218\u12ED \u12AD\u1215\u130D\u12D8\u12A9\u121D \u12A5\u12BD\u12A5\u120D?" }[selectedLang],
      score: 70, label: selectedLang === 'en' ? "Stable" : "\u12E8\u1270\u1228\u130B\u130B", micro_action: selectedLang === 'en' ? "Take a moment to sit quietly and relax." : "\u1208\u1325\u1242\u1275 \u12F0\u1242\u1243\u12CE\u127D \u1338\u1325 \u1265\u1208\u12CD \u12ED\u1228\u1349\u1362", communities: []
    };
  }

  // --- 3. YES/NO CONTINUATION ---
  const isYes = /\b(yes|ok|sure|fine|yeah|alright)\b/.test(msgLower) || msgLower.includes("\u12A0\u12CE") || msgLower.includes("\u12A5\u123A");
  const isNo = /\b(no|not|never|nope)\b/.test(msgLower) || msgLower.includes("\u12A0\u12ED") || msgLower.includes("\u12A0\u120D\u1348\u120D\u130D\u121D");

  // Only treat as pure yes/no if message is very short (< 5 words)
  const wordCount = cleanMsg.split(/\s+/).length;

  if ((isYes || isNo) && wordCount <= 4) {
    const profLabel = getProfLabel();
    const ageLabel = getAgeLabel();
    if (isYes) {
      return {
        advice: { en: `Thank you for being open. As a ${profLabel} in the ${ageLabel} stage, taking even small steps matters. What is the main barrier preventing you from doing a small wellness action consistently?`, am: `\u1235\u120B\u1228\u130B\u1308\u1321\u120D\u129D \u12A0\u1218\u1230\u130D\u1293\u1208\u1201\u1362 \u12A5\u1295\u12F0 ${profLabel} \u1260${ageLabel} \u12F0\u1228\u1303 \u120B\u12ED\u1363 \u1275\u1295\u123D \u1270\u130D\u1263\u122B\u1275\u1295 \u121B\u12A8\u1293\u12C8\u1295 \u12A5\u122D\u121D\u1303 \u1290\u12CD\u1362 \u12ED\u1205\u1295\u1295 \u1265\u12E8\u1240\u1291 \u12A5\u1295\u12F3\u12EB\u12F0\u122D\u1309 \u12E8\u121A\u12A8\u1208\u12AD\u120D\u12CE\u1275 \u12CB\u1290\u129B\u12CD \u12A5\u1295\u1245\u134D\u1275 \u121D\u1295\u12F5\u1295 \u1290\u12CD?`, om: `Galatoomi. Akka ${profLabel} fi umrii ${ageLabel} keessatti, tarkaanfii xiqqaa fudhachuun gaariidha. Maaltu si dhabsiisa?`, ti: `\u1235\u1208 \u12D8\u1228\u130B\u1308\u133D\u12A9\u121D\u1208\u12ED \u12E8\u1240\u1295\u12E8\u1208\u12ED\u1362 \u12A8\u121D ${profLabel} \u12A0\u1265 ${ageLabel} \u12D5\u12F5\u1218\u1363 \u1295\u12A1\u1233\u1295 \u1293\u12ED \u1325\u12D5\u1293 \u1235\u1309\u121D\u1272 \u121D\u12CD\u1233\u12F5 \u12A0\u1308\u12F3\u1232 \u12A5\u12E9\u1362 \u12A5\u12DA \u1295\u1325\u1348\u1275 \u1295\u121D\u1235\u120B\u1325 \u12A5\u1295\u1273\u12ED \u12ED\u12D5\u130D\u1270\u12A9\u121D?` }[selectedLang],
        score: 72, label: selectedLang === 'en' ? "Stable" : "\u12E8\u1270\u1228\u130B\u130B", micro_action: selectedLang === 'en' ? "Take a single conscious breath right now." : "\u12A0\u1201\u1295 \u12A0\u1295\u12F5 \u1260\u1325\u120D\u1245 \u1275\u1295\u134B\u123D \u12ED\u12CD\u1230\u12F1\u1362", communities: []
      };
    } else {
      return {
        advice: { en: `I completely understand and respect that. What is one area you feel we should focus on first to help you feel a bit lighter today?`, am: `\u12A5\u1228\u12F3\u1208\u1201\u1362 \u12ED\u1205 \u12A0\u12AB\u1204\u12F5 \u1208\u12A5\u122D\u1235\u12CE \u12E8\u121B\u12ED\u1218\u127D \u12A8\u1206\u1290 \u120C\u120B \u1290\u1308\u122D \u1218\u121E\u12A8\u122D \u12A5\u1295\u127D\u120B\u1208\u1295\u1362 \u12A0\u1201\u1295 \u1245\u12F5\u121A\u12EB \u1230\u1325\u1270\u1295 \u12A5\u1295\u12F5\u1295\u1290\u130B\u1308\u122D\u1260\u1275 \u12E8\u121A\u1348\u120D\u1309\u1275 \u1290\u1308\u122D \u121D\u1295\u12F5\u1295 \u1290\u12CD?`, om: `Ni hubadha. Tasgabbaa'uuf maal irratti xiyyeeffachuu qabna?`, ti: `\u12ED\u122D\u12F3\u12A5\u1292 \u12A5\u12E9\u1362 \u1213\u1308\u12DD \u1295\u121D\u122D\u12AB\u1265 \u1245\u12F5\u121D \u1240\u12F3\u12F5\u121D \u12A0\u1265 \u12A5\u1295\u1273\u12ED \u12AD\u1290\u1270\u12A9\u122D \u1275\u12F0\u120D\u12E9?` }[selectedLang],
        score: 60, label: selectedLang === 'en' ? "Moderate stress" : "\u1218\u12AB\u12A8\u1208\u129B \u132D\u1295\u1240\u1275", micro_action: selectedLang === 'en' ? "Close your eyes for 2 minutes to rest." : "\u1208 2 \u12F0\u1242\u1243 \u12EB\u1205\u120D \u12A0\u12ED\u1296\u127D\u12CE\u1295 \u1328\u134D\u1290\u12CD \u12EB\u122D\u1349\u1362", communities: []
      };
    }
  }

  // --- 4. TOPIC DETECTION ---
  const familyKW = ["argu", "conflict", "fight", "dad", "mom", "mother", "father", "parent", "sister", "brother", "family", "\u12A5\u1293\u1275", "\u12A0\u1263\u1275", "\u1264\u1270\u1230\u1265", "\u1323\u120B", "lola", "maatii", "\u1263\u12A5\u1232", "\u1235\u12F5\u122B"];
  const workKW = ["hospital", "doctor", "nurse", "work", "job", "career", "boss", "office", "burnout", "tired", "exhausted", "shift", "hours", "duty", "\u1235\u122B", "\u12F0\u12A8\u1218\u129D", "\u1210\u12AA\u121D", "hojii", "\u12F5\u12AB\u121D", "\u1235\u122B\u1215"];
  const financeKW = ["money", "debt", "rent", "expensive", "struggling", "finance", "bill", "poverty", "\u1308\u1295\u12D8\u1265", "\u12A5\u12F3", "\u12AA\u122B\u12ED", "\u127D\u130D\u122D", "qarshii", "liqii", "\u12D5\u12F3"];
  const lonelyKW = ["lonely", "alone", "sad", "unhappy", "crying", "isolated", "\u1265\u127B\u12E8\u1295", "\u12F5\u1265\u122D\u1275", "\u1265\u1279\u129D\u1290\u1275", "\u1200\u12D8\u1295", "kophaa", "gadda", "\u133D\u121D\u12CB", "\u1213\u12D8\u1295"];
  const anxietyKW = ["anxious", "anxiety", "stressed", "scared", "fear", "panic", "worry", "\u132D\u1295\u1240\u1275", "\u134D\u122D\u1203\u1275", "\u12CD\u1325\u1228\u1275", "yaaddoo", "soda", "\u134D\u122D\u1213\u1275"];

  let topic = "general";
  if (familyKW.some(k => msgLower.includes(k))) topic = "family";
  else if (workKW.some(k => msgLower.includes(k))) topic = "work";
  else if (financeKW.some(k => msgLower.includes(k))) topic = "finance";
  else if (lonelyKW.some(k => msgLower.includes(k))) topic = "lonely";
  else if (anxietyKW.some(k => msgLower.includes(k))) topic = "anxiety";

  // --- 5. DYNAMIC SCORE ---
  let score = 70;
  if (profile.economicStatus === "struggling") score -= 20;
  else if (profile.economicStatus === "low_income") score -= 10;
  else if (profile.economicStatus === "comfortable") score += 10;
  else if (profile.economicStatus === "high_income") score += 15;
  if (profile.healthConditions) { score -= profile.healthConditions.filter(c => c !== "none").length * 8; }
  const highStressJobs = ["doctors", "nurses", "pharmacists", "police", "firefighters", "teachers", "students"];
  if (highStressJobs.includes(profile.profession)) score -= 10;

  const negWords = ["stressed", "tired", "burnout", "exhausted", "sad", "lonely", "angry", "arguing", "problem", "bills", "sick", "pain", "\u132D\u1295\u1240\u1275", "\u12F5\u12AB\u121D", "\u127D\u130D\u122D", "dhiphina", "rakkoo", "gadda"];
  const posWords = ["happy", "good", "fine", "stable", "improving", "better", "great", "\u12F0\u1235\u1270\u129B", "\u12F0\u1205\u1293", "gammachuu"];
  negWords.forEach(w => { if (msgLower.includes(w)) score -= 7; });
  posWords.forEach(w => { if (msgLower.includes(w)) score += 7; });
  if (topic === "family") score -= 12;
  else if (topic === "work") score -= 10;
  else if (topic === "finance") score -= 14;
  else if (topic === "lonely") score -= 8;
  else if (topic === "anxiety") score -= 10;
  score = Math.max(5, Math.min(98, score));

  let label;
  if (score <= 20) label = selectedLang === 'en' ? "Crisis" : (selectedLang === 'am' ? "\u12A0\u1235\u1278\u12B3\u12ED \u1201\u1294\u1273" : (selectedLang === 'om' ? "Crisis" : "\u1205\u1339\u133D \u12A9\u1290\u1273\u1275"));
  else if (score <= 40) label = selectedLang === 'en' ? "High stress" : (selectedLang === 'am' ? "\u12A8\u134D\u1270\u129B \u132D\u1295\u1240\u1275" : (selectedLang === 'om' ? "Yaaddoo Ol'aanaa" : "\u120D\u12D1\u120D \u1338\u1245\u1322"));
  else if (score <= 60) label = selectedLang === 'en' ? "Moderate stress" : (selectedLang === 'am' ? "\u1218\u12AB\u12A8\u1208\u129B \u132D\u1295\u1240\u1275" : (selectedLang === 'om' ? "Yaaddoo Giddu-galeessaa" : "\u121B\u12A5\u12A8\u120B\u12ED \u1338\u1245\u1322"));
  else if (score <= 80) label = selectedLang === 'en' ? "Stable" : (selectedLang === 'am' ? "\u12E8\u1270\u1228\u130B\u130B" : (selectedLang === 'om' ? "Tasgabbaa'eera" : "\u12DD\u1270\u1228\u130B\u130B\u1210"));
  else label = selectedLang === 'en' ? "Thriving" : (selectedLang === 'am' ? "\u12F0\u1235\u1270\u129B" : (selectedLang === 'om' ? "Thriving" : "\u12F0\u1235\u1270\u129B"));

  // --- 6. DYNAMIC RESPONSE (ChatGPT-like: references user's text + profile) ---
  const profLabel = getProfLabel();
  const ageLabel = getAgeLabel();

  // Extract user phrase for quoting
  const cleanPronouns = (s) => s.replace(/\bi am\b/gi, "you are").replace(/\bi feel\b/gi, "you feel").replace(/\bi'm\b/gi, "you're").replace(/\bmy\b/gi, "your").replace(/\bme\b/gi, "you").replace(/\bi\b/gi, "you").replace(/\bour\b/gi, "your").trim();
  let userPhrase = message;
  const dotIdx = message.indexOf('.');
  if (dotIdx > 0) userPhrase = message.substring(0, dotIdx);
  const quotedText = cleanPronouns(userPhrase).replace(/[?.,!]/g, "").trim();

  let adviceText = "";
  let microAction = "";
  let communities = [];

  if (selectedLang === 'en') {
    const validation = `I hear that ${quotedText}. `;
    if (topic === "work") {
      adviceText = validation + `As a ${profLabel} in the ${ageLabel} stage, balancing professional exhaustion is critical. Burnout doesn't just go away on its own \u2014 it compounds. Can you try taking small 5-minute micro-breaks during your shift today to breathe and reset?`;
      microAction = "Perform a 5-minute deep breathing cycle on your next break.";
      communities = ["Burnout Recovery Alliance", "Anxiety & Depression Safe Space"];
    } else if (topic === "family") {
      adviceText = validation + `At your stage of life (${ageLabel}), conflicts with family directly impact your core emotional safety. It helps to define healthy personal boundaries and step away from the tension. Is there a trusted family elder or a community figure you can consult?`;
      microAction = "Step away from family tension for a 15-minute walk.";
      communities = ["Anxiety & Depression Safe Space", "Loneliness & Isolation Support"];
    } else if (topic === "finance") {
      adviceText = validation + `Financial pressure as a ${profLabel} keeps your nervous system in constant survival mode. Your personal worth is not defined by your financial situation. Have you considered discussing this load with someone in your local edir or equb community?`;
      microAction = "Review free wellness nature parks on the Discover page.";
      communities = ["Debt & Financial Crisis", "Anxiety & Depression Safe Space"];
    } else if (topic === "lonely") {
      adviceText = validation + `Experiencing loneliness during the ${ageLabel} stage can make every problem feel twice as large. Connecting with others \u2014 even anonymously \u2014 helps break this isolation. Would you be open to writing a short anonymous post in one of our Warka group chats?`;
      microAction = "Join one Warka community chatroom anonymously.";
      communities = ["Loneliness & Isolation Support", "Anxiety & Depression Safe Space"];
    } else if (topic === "anxiety") {
      adviceText = validation + `Anxiety triggers a physical fight-or-flight response. Grounding yourself in your body is the first clinical step. What specific physical signs are you noticing right now \u2014 is your heart racing, or do you feel tightness in your chest?`;
      microAction = "Inhale slowly for 4 seconds, hold for 4, exhale for 4.";
      communities = ["Anxiety & Depression Safe Space", "Burnout Recovery Alliance"];
    } else {
      adviceText = validation + `As a ${profLabel} in the ${ageLabel} stage, handling life's pressures takes significant emotional strength. Taking small structured steps is key to emotional recovery. Would you like to tell me more about what is taking up the most mental space for you right now?`;
      microAction = "Step outside for a 10-minute walk to settle your thoughts.";
      communities = ["Anxiety & Depression Safe Space", "Loneliness & Isolation Support"];
    }
  } else if (selectedLang === 'am') {
    const validation = `\u00AB${userPhrase}\u00BB \u121B\u1208\u1271\u12CE\u1275\u1295 \u1230\u121D\u1277\u1208\u1201\u1362 \u12ED\u1205 \u1275\u120D\u1245 \u1235\u1290-\u120D\u1266\u1293\u12CA \u132B\u1293 \u120A\u134D\u1320\u122D\u1265\u12CE\u1275 \u12A5\u1295\u12F0\u121A\u127D\u120D \u12A5\u1228\u12F3\u1208\u1201\u1362 `;
    if (topic === "work") {
      adviceText = validation + `\u12A5\u1295\u12F0 ${profLabel} \u1260\u12A5\u12F5\u121C ${ageLabel} \u12F0\u1228\u1303 \u120B\u12ED \u1218\u1206\u1295\u12CE \u12E8\u1235\u122B \u132B\u1293\u1295 \u12A5\u1293 \u12F5\u12AB\u121D\u1295 \u1260\u1265\u12DB\u1275 \u120A\u12EB\u1263\u1265\u1230\u12CD \u12ED\u127D\u120B\u120D\u1362 \u12DB\u1228 \u1260\u1235\u122B \u1230\u12D3\u1275\u12CE \u12CD\u1235\u1325 \u1325\u1242\u1275 \u12F0\u1242\u1243\u12CE\u127D \u12C8\u1235\u12F0\u12CD \u12D8\u1293 \u1208\u121B\u1208\u1275 \u1218\u121E\u12A8\u122D \u12ED\u127D\u120B\u1209?`;
      microAction = "\u1260\u121A\u1240\u1325\u1208\u12CD \u12E8\u1235\u122B \u12A5\u1228\u134D\u1275\u12CE \u120B\u12ED \u1208 5 \u12F0\u1242\u1243 \u1260\u1325\u120D\u1240\u1275 \u12E8\u1218\u1270\u1295\u1348\u1235 \u120D\u121D\u121D\u12F5 \u12EB\u12F5\u122D\u1309\u1362";
      communities = ["Burnout Recovery Alliance", "Anxiety & Depression Safe Space"];
    } else if (topic === "family") {
      adviceText = validation + `\u1260\u1205\u12ED\u12C8\u1275\u12CE (${ageLabel}) \u12E8\u1264\u1270\u1230\u1265 \u130D\u1305\u1275 \u12C8\u12ED\u121D \u12A0\u1208\u1218\u130D\u1263\u1263\u1275 \u1260\u1264\u1275 \u12CD\u1235\u1325 \u12EB\u1208\u12CD\u1295 \u1230\u120B\u121D \u1260\u121B\u1323\u1275 \u1208\u12A0\u12A5\u121D\u122E \u132D\u1295\u1240\u1275 \u12CB\u1290\u129B \u1218\u1295\u1235\u12A4 \u12ED\u1206\u1293\u120D\u1362 \u1208\u121A\u1273\u1218\u1295 \u12E8\u1203\u12ED\u121B\u1296\u1275 \u12A0\u1263\u1275 \u12C8\u12ED\u121D \u1238\u121B\u130D\u120C \u1262\u12EB\u121B\u12AD\u1229 \u121D\u1295 \u12ED\u1218\u1235\u120D\u12CE\u1273\u120D?`;
      microAction = "\u12A8\u1264\u1270\u1230\u1265 \u132D\u1295\u1240\u1275 \u1208\u1218\u122B\u1245 \u1208 15 \u12F0\u1242\u1243 \u1260\u12A5\u130D\u122D \u12ED\u122B\u1218\u12F1\u1362";
      communities = ["\u12E8\u12F5\u1265\u122D\u1275\u1293 \u132D\u1295\u1240\u1275 \u121B\u1246\u121A\u12EB", "\u12E8\u1265\u1279\u129D\u1290\u1275\u1293 \u1218\u1308\u1208\u120D \u1218\u1241\u1241\u121A\u12EB"];
    } else if (topic === "finance") {
      adviceText = validation + `\u12A5\u1295\u12F0 ${profLabel} \u12E8\u1308\u1295\u12D8\u1265 \u12A5\u1293 \u12E8\u12A2\u12AE\u1296\u121A \u12CD\u1325\u1228\u1275 \u12A0\u12A5\u121D\u122E\u1295 \u1201\u120D\u130A\u12DC \u1260\u1235\u130B\u1275 \u12CD\u1235\u1325 \u12A5\u1295\u12F2\u1246\u12ED \u12EB\u12F0\u122D\u1308\u12CB\u120D\u1362 \u12ED\u1205\u1295\u1295 \u1238\u12AD\u121D \u1208\u12A5\u12F5\u122D \u12A0\u1263\u120B\u1275 \u12C8\u12ED\u121D \u1208\u1245\u122D\u1265 \u1309\u12A0\u12F0\u129B \u121B\u12AB\u1348\u120D \u12A0\u1235\u1260\u12CD \u12EB\u12CD\u1243\u1209?`;
      microAction = "\u1290\u133B \u12E8\u1206\u1291 \u12E8\u1270\u134D\u1320\u122E \u1218\u12DD\u1293\u129B\u12CE\u127D\u1295 \u1260 Discover \u1308\u133D \u120B\u12ED \u12ED\u1218\u120D\u12A8\u1271\u1362";
      communities = ["\u12E8\u12A5\u12F3 \u12A5\u1293 \u12E8\u1308\u1295\u12D8\u1265 \u1240\u12CD\u1235", "\u12E8\u12F5\u1265\u122D\u1275\u1293 \u132D\u1295\u1240\u1275 \u121B\u1246\u121A\u12EB"];
    } else if (topic === "lonely") {
      adviceText = validation + `\u1260\u12A5\u12F5\u121C ${ageLabel} \u12E8\u1265\u1279\u129D\u1290\u1275 \u1235\u121C\u1275 \u1232\u1230\u121B\u1295 \u121B\u1295\u129B\u12CD\u121D \u127D\u130D\u122D \u1260\u12A5\u1325\u134D \u12A5\u1295\u12F2\u12A8\u1265\u12F0\u1295 \u12EB\u12F0\u122D\u130B\u120D\u1362 \u1235\u121D\u12CE\u1295 \u1260\u1218\u12F0\u1260\u1245 \u1260\u12CB\u122D\u12AB \u121B\u1205\u1260\u1228\u1230\u1265 \u12AD\u1260\u1265 \u12CD\u1235\u1325 \u1218\u120D\u12A5\u12AD\u1275 \u1260\u1218\u133B\u134D \u1218\u1300\u1218\u122D \u12ED\u1348\u120D\u130B\u1209?`;
      microAction = "\u12DB\u1228 \u1260\u12A0\u1295\u12F1 \u12E8\u12CB\u122D\u12AB \u121B\u1205\u1260\u1228\u1230\u1265 \u12AD\u1260\u1265 \u12CD\u1235\u1325 \u1235\u121D-\u12A0\u120D\u1263 \u1218\u120D\u12A5\u12AD\u1275 \u12ED\u133B\u1349\u1362";
      communities = ["\u12E8\u1265\u1279\u129D\u1290\u1275\u1293 \u1218\u1308\u1208\u120D \u1218\u1241\u1241\u121A\u12EB", "\u12E8\u12F5\u1265\u122D\u1275\u1293 \u132D\u1295\u1240\u1275 \u121B\u1246\u121A\u12EB"];
    } else if (topic === "anxiety") {
      adviceText = validation + `\u12F5\u1295\u1308\u1270\u129B \u12E8\u134D\u122D\u1203\u1275\u1293 \u12E8\u132D\u1295\u1240\u1275 \u1235\u121C\u1275 \u1232\u1230\u121B\u12CE\u1275 \u1230\u12CD\u1290\u1275\u12CE\u1295 \u1208\u121B\u1228\u130B\u130B\u1275 \u12E8\u1275\u1295\u134B\u123D \u120D\u121D\u121D\u12F5 \u12C8\u1233\u129D \u1290\u12CD\u1362 \u12A0\u1201\u1295 \u12E8\u120D\u1265 \u121D\u1275 \u1218\u1328\u1218\u122D \u12C8\u12ED\u121D \u1275\u12A8\u123B\u12CE \u12A0\u12AB\u1263\u1262 \u12E8\u1321\u1295\u1327 \u1218\u12C8\u1320\u122D \u12ED\u1230\u121B\u12CE\u1273\u120D?`;
      microAction = "\u1260MindFuel \u1308\u133D \u120B\u12ED \u12E8 3 \u12F0\u1242\u1243 \u12E8\u1275\u1295\u134B\u123D \u121B\u1230\u120B\u1230\u120D \u120D\u121D\u121D\u12F5 \u12EB\u12F5\u122D\u1309\u1362";
      communities = ["\u12E8\u12F5\u1265\u122D\u1275\u1293 \u132D\u1295\u1240\u1275 \u121B\u1246\u121A\u12EB", "Burnout Recovery Alliance"];
    } else {
      adviceText = validation + `\u12A5\u1295\u12F0 ${profLabel} \u1260\u12A5\u12F5\u121C ${ageLabel} \u12F0\u1228\u1303 \u120B\u12ED \u1206\u1290\u12CD \u12ED\u1205\u1295\u1295 \u12CD\u1325\u1228\u1275 \u1208\u1218\u1246\u1323\u1320\u122D \u1218\u121E\u12A8\u122D\u12CE \u1275\u120D\u1245 \u1325\u1295\u12AB\u1228 \u1290\u12CD\u1362 \u1260\u12A0\u1201\u1291 \u1230\u12D3\u1275 \u1260\u12A0\u12A5\u121D\u122E\u12CE \u12CD\u1235\u1325 \u1275\u120D\u1241\u1295 \u1266\u1273 \u12E8\u12EB\u12D8\u12CD\u1295 \u1290\u1308\u122D \u1260\u12DD\u122D\u12DD\u122D \u120A\u1290\u130D\u1229\u129D \u12ED\u127D\u120B\u1209?`;
      microAction = "\u1208\u1325\u1242\u1275 \u12F0\u1242\u1243\u12CE\u127D \u1338\u1325 \u1263\u1208 \u12AD\u134D\u120D \u12CD\u1235\u1325 \u12A0\u1228\u134D \u12ED\u1260\u1209\u1362";
      communities = ["\u12E8\u12F5\u1265\u122D\u1275\u1293 \u132D\u1295\u1240\u1275 \u121B\u1246\u121A\u12EB", "\u12E8\u1265\u1279\u129D\u1290\u1275\u1293 \u1218\u1308\u1208\u120D \u1218\u1241\u1241\u121A\u12EB"];
    }
  } else if (selectedLang === 'om') {
    const validation = `"${userPhrase}" jechuun kee naaf galeera. Kuni dhiphina guddaa sitti uumuu akka danda'u nan hubadha. `;
    adviceText = validation + `Akka ${profLabel} fi umrii ${ageLabel} keessatti, dhibbaa jireenya guyyaa guyyaa hir'isuuf sochii gochuun gaariidha. Gorsa kootiin, boqonnaa gabaabaa fudhadhu. Yaada kee irratti maaltu dhiphina sitti uumaa jira?`;
    microAction = "Bakka nagaa qabu gadi bahi socho'i.";
    communities = ["Iddoo Nagaa Yaaddoo fi Gaddaa", "Kophaa ta'uu fi Lagatamu"];
  } else if (selectedLang === 'ti') {
    const validation = `"\u00AB${userPhrase}\u00BB \u121D\u1263\u120D\u12A9\u121D \u1230\u121A\u12D0 \u12A0\u1208\u12A9\u1362 \u12A5\u12DA \u12A0\u1265 \u120D\u12D5\u120C\u12A9\u121D \u120D\u12D1\u120D \u1338\u1245\u1322 \u12AD\u134D\u1320\u122D \u12A8\u121D \u12DD\u12AD\u12A5\u120D \u12A5\u130D\u1295\u12D8\u1265\u1362 `;
    adviceText = validation + `\u12A8\u121D ${profLabel} \u1218\u1320\u1295 \u12A0\u1265 ${ageLabel} \u12D5\u12F5\u1218 \u121D\u1205\u120B\u12CD\u12A9\u121D\u1363 \u12CD\u1325\u1228\u1275 \u1218\u1246\u1323\u1320\u122D \u12A0\u1308\u12F3\u1232 \u12A5\u12E9\u1362 \u1293\u12ED \u121D\u1235\u1275\u1295\u134B\u1235 \u120D\u121D\u121D\u12F5 \u130D\u1260\u1229\u1362 \u1210\u12DA \u1265\u12DD\u1260\u1208\u133E \u12D8\u1328\u1295\u1240\u12A9\u121D \u12D8\u120E \u12A5\u1295\u1273\u12ED \u12A5\u12E9?`;
    microAction = "\u12955 \u12F0\u1242\u1243 \u1338\u1325 \u12A2\u120D\u12A9\u121D \u12AE\u134D \u1260\u1209\u1362";
    communities = ["\u12CD\u1211\u1235 \u1266\u1273 \u132D\u1295\u1240\u1275\u1295 \u12F5\u1265\u122D\u1275\u1295", "\u12F0\u1308\u134D \u133D\u121D\u12CB\u1295 \u1270\u1290\u133D\u120E\u1295"];
  }

  // --- 7. CLINICAL GREETING (only first turn, non-emergency) ---
  if (history && history.length <= 1) {
    let prepend = "";
    if (selectedLang === 'en') {
      prepend = `As a psychiatric counselor reviewing your situation as a ${profLabel} in the ${ageLabel} stage, I want to validate your feelings: `;
    } else if (selectedLang === 'am') {
      prepend = `\u12A5\u1295\u12F0 \u12A0\u12A5\u121D\u122E \u1324\u1293 \u12A0\u121B\u12AB\u122A\u1363 \u1260\u12A5\u12F5\u121C ${ageLabel} \u12A5\u1293 \u1260\u1219\u12EB ${profLabel} \u1218\u1206\u1295\u12CE\u1295 \u12A8\u130D\u121D\u1275 \u12CD\u1235\u1325 \u1260\u121B\u1235\u1308\u1263\u1275 \u1235\u121C\u1275\u12CE\u1295 \u12A5\u1228\u12F3\u1208\u1201\u1362 `;
    } else if (selectedLang === 'om') {
      prepend = `Akka gorsaa fayyaa sammuutti, haala kee akka ${profLabel} fi umrii ${ageLabel} ta'uu kee hubadheera: `;
    } else if (selectedLang === 'ti') {
      prepend = `\u12A8\u121D \u1293\u12ED \u12A0\u12A5\u121D\u122E \u1325\u12D5\u1293 \u12A0\u121B\u12EB\u12A8\u122A \u1218\u1320\u1295\u1363 \u1265\u12D5\u12F5\u1218 ${ageLabel} \u12A8\u121D\u12E9 \u12F5\u121B \u1265\u121E\u12EB ${profLabel} \u121D\u12AB\u1295\u12A9\u121D \u122D\u12A5\u12E8 \u1235\u121D\u12D2\u1275\u12A9\u121D \u12A5\u130D\u1295\u12D8\u1265\u1366 `;
    }
    adviceText = prepend + adviceText;
  }

  return { advice: adviceText, score, label, micro_action: microAction, communities };
};

export const getFallbackFoodAnalysis = (foodId, profile, lang) => {
  const isDiabetic = profile.healthConditions?.includes("diabetes");
  // The following variables are kept for future expansion, but commented out to pass ESLint
  // const isHypertensive = profile.healthConditions?.includes("hypertension");
  // const isAnemic = profile.healthConditions?.includes("anemia");
  // const isPregnant = profile.healthConditions?.includes("pregnancy_1st") || profile.healthConditions?.includes("pregnancy_2nd") || profile.healthConditions?.includes("pregnancy_3rd");

  const responses = {
    teff_injera: {
      name: { en: "Teff Injera", am: "\u1320\u134D \u12A5\u1295\u1300\u122B", om: "Biddeena Xaafii", ti: "\u1323\u134D \u12A5\u1295\u1300\u122B" },
      verdict: isDiabetic ? "yellow" : "green",
      verdictLabel: {
        en: isDiabetic ? "Okay in moderation" : "Great choice for your profile",
        am: isDiabetic ? "\u1260\u120D\u12AD \u1218\u1265\u120B\u1275 \u12ED\u1218\u1228\u1323\u120D" : "\u1208\u12A5\u122D\u1235\u12CE \u121D\u122D\u1325 \u121D\u130D\u1265 \u1290\u12CD",
        om: isDiabetic ? "Madaalaan nyaadhu" : "Filannoo gaarii",
        ti: isDiabetic ? "\u1265\u12D3\u1240\u1295 \u1265\u120D\u12D1" : "\u121D\u122D\u133D \u121D\u122D\u1327"
      },
      analysis: {
        en: isDiabetic
          ? "Teff injera has a low glycemic index, but portion size matters. Limit your daily consumption to 2 pieces max, spread across meals."
          : "Teff is rich in magnesium which regulates stress hormones, and high iron which supports energy and builds blood health.",
        am: isDiabetic
          ? "\u1320\u134D \u12A5\u1295\u1300\u122B \u12DD\u1245\u1270\u129B \u130D\u120A\u1234\u121A\u12AD \u121B\u12CD\u1327 \u1262\u1296\u1228\u12CD\u121D \u12E8\u121A\u1260\u1209\u1275 \u1218\u1320\u1295 \u12C8\u1233\u129D \u1290\u12CD\u1362 \u1260\u1240\u1295 \u12A82 \u12A5\u1295\u1300\u122B \u1260\u120B\u12ED \u12A0\u12ED\u1218\u1308\u1261\u1363 \u1260\u12E8\u1218\u1200\u1209 \u12ED\u12A8\u134B\u134D\u1209\u1275\u1362"
          : "\u1320\u134D \u12E8\u12A0\u12A5\u121D\u122E \u132D\u1295\u1240\u1275\u1295 \u12E8\u121A\u1240\u1295\u1235 \u121B\u130D\u1292\u12E5\u12E8\u121D \u12A5\u1293 \u12E8\u12F0\u121D \u121B\u1290\u1235\u1295 \u12E8\u121A\u12A8\u120B\u12A8\u120D \u12E8\u1265\u1228\u1275 (Iron) \u12ED\u12D8\u1275 \u12A0\u1208\u12CD\u1362",
        om: isDiabetic
          ? "Biddeen xaafii sukkaaraaf gaariidhha garuu hamma isaa eeggadhu. Guyyaatti injera 2 caalaa nyaachuu hin qabdu."
          : "Xaafiin magnesium dhibbaa sammuu hir'isuufi sibiila dhiiga guutuuf qaba.",
        ti: isDiabetic
          ? "\u1323\u134D \u12A5\u1295\u1300\u122B \u1275\u1211\u1275 \u130D\u120A\u1234\u121A\u12AD \u1228\u12F5\u12A2\u1275 \u12A5\u12B3 \u12A5\u1295\u1270\u1213\u1208\u12CE \u12DD\u1265\u120B\u12D5 \u1218\u1320\u1295 \u12C8\u1233\u1292 \u12A5\u12E9\u1362 \u12A0\u1265 \u1218\u12D3\u120D\u1272 \u12AB\u1265 2 \u12A5\u1295\u1300\u122B \u1295\u120B\u12D5\u120A \u12A0\u12ED\u1275\u1265\u120D\u12D1\u1362"
          : "\u1323\u134D \u1295\u1338\u1245\u1322 \u12A0\u12A5\u121D\u122E \u12DD\u1240\u1295\u1235 \u121B\u130D\u1292\u12E5\u12E8\u121D\u1295 \u12F0\u121D \u12D8\u1260\u120D\u133D\u130D \u1295\u1325\u1228 \u1290\u1308\u122D \u1213\u133A\u1295 \u12DD\u1213\u12D8 \u12A5\u12E9\u1362"
      },
      portionAdvice: {
        en: "Limit to 1/2 or 1 piece per meal.",
        am: "\u1260\u12A0\u1295\u12F5 \u121B\u12D3\u12F5 \u130D\u121B\u123D \u12C8\u12ED\u121D \u12A0\u1295\u12F5 \u12A5\u1295\u1300\u122B \u1265\u127B \u12ED\u1265\u1209\u1362",
        om: "Nyaata tokkorratti walakkaa nyaadhu.",
        ti: "\u12A0\u1265 \u1213\u12F0 \u1218\u12A3\u12F2 \u134D\u122D\u1242 \u12C8\u12ED \u1213\u12F0 \u12A5\u1295\u1300\u122B \u1325\u122B\u12ED \u1265\u120D\u12D1\u1362"
      }
    },
    shiro_wot: {
      name: { en: "Shiro Wot (Chickpea Stew)", am: "\u123D\u122E \u12C8\u1325", om: "Shiroo Wotii", ti: "\u123D\u122E \u12C8\u1325" },
      verdict: "green",
      verdictLabel: {
        en: "Great choice for your profile",
        am: "\u1208\u12A5\u122D\u1235\u12CE \u121D\u122D\u1325 \u121D\u122D\u1325 \u1290\u12CD",
        om: "Filannoo gaarii",
        ti: "\u121D\u122D\u133D \u121D\u122D\u1327"
      },
      analysis: {
        en: "Shiro is an affordable and rich plant protein source. Highly recommended for budgets under 100 ETB. Fasting-friendly.",
        am: "\u123D\u122E \u1260\u130B\u1325\u1290\u1275 \u1270\u1218\u1323\u1323\u129D\u1295 \u12E8\u1355\u122E\u1272\u1295 \u121D\u1295\u1327 \u1290\u12CD\u1362 \u1260\u1325\u123B\u121D \u12A5\u1295\u12F0 \u121D\u130D\u1265 \u12ED\u1228\u1303\u120D\u1362",
        om: "Shiroon nyaata gatii salphaa fi pirootiinii qaba. Guyyaa soomaaf mijaadha.",
        ti: "\u123D\u122E \u1260\u130B\u1325\u1295 \u1270\u1218\u1323\u1323\u1292\u1295 \u121D\u122D\u133D \u1355\u122E\u1272\u1295 \u12D8\u134D\u1262\u1295 \u12A5\u12E9\u1362"
      },
      portionAdvice: {
        en: "1 to 2 ladles. Serve with gomen side.",
        am: "\u12A81-2 \u1325\u1265\u1235\u1275\u1362 \u12A8\u1308\u121D\u1295 \u130B\u122D \u12EB\u1260\u120D\u1349\u1362",
        om: "Kortee 1-2. Gomen wajjin nyaadhu.",
        ti: "\u12A0\u1265 1-2 \u1325\u1265\u1235\u1275\u1362 \u121D\u1235 \u1308\u121D\u1295 \u12A0\u1265\u120D\u12D1\u1362"
      }
    }
  };

  const selected = responses[foodId] || responses["shiro_wot"];
  return {
    foodName: selected.name[lang] || selected.name["en"],
    verdict: selected.verdict,
    verdictLabel: selected.verdictLabel[lang] || selected.verdictLabel["en"],
    analysis: selected.analysis[lang] || selected.analysis["en"],
    portionAdvice: selected.portionAdvice[lang] || selected.portionAdvice["en"]
  };
};
