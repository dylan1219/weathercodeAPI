const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const weatherCodeDescriptions = {
    0: "Di Mawaring Panahon",
    1000: "Maliwanag ang Kalangitan(Simulan na ang Labada.) ",
    1001: "Aba'y Medyo Maulap ang Kalangitan",
    1100: "Ayy Mainit sa Umaga, Maglagay ng Sunscreen at Uminom ng maraming tubig",
    1101: "Medyo Maulap ang Kalangitan pero hindi uulan",
    1102: "Maulap,Di Makita ang Araw.Maulap din sa Gabi",
    2000: "Mahamog parang Baguio",
    2100: "Bahagyang Mahamog parang Tagaytay",
    3000: "Mahangin ba Labas?",
    3001: "Banayad na hangin.Masarap matulog",
    3002: "Malakas ang Hangin Sa Labas",
    4000: "Maambon, Ikaw ay magsuot ng Gora",
    4001: "Magdala ka ng Payong. May Ulan na Bahagya",
    4200: "Maulan ng Bahagya, Pero Magpayong ka pa rin",
    4201: "Malakas ang ulan!.Iwasan magpagalagala",
    8000: "Mag-ingat sa Kulog at Kidlat. Hindi ka si superman."
};

app.get('/api/weather-code/:code', (req, res) => {
    const { code } = req.params;
    //convert the code from a string to a number
    const numericCode = Number(code);
    const description = weatherCodeDescriptions[code] || "Unknown weather code";
    res.json({ code:numericCode, description });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
