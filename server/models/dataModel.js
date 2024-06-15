const fs = require('fs');
const path = require('path');

const getUserData = () => {
    // const dataPath = path.join(__dirname, '../data/userData.json');
    const balanceSheetDataPath = path.join(__dirname, '../data/balanceSheet.json');
    const profitLossDataPath = path.join(__dirname, '../data/profitLoss.json');

    // const rawData = fs.readFileSync(dataPath);
    const balanceSheetRawData = fs.readFileSync(balanceSheetDataPath);
    const profitLossRawData = fs.readFileSync(profitLossDataPath);
    
    const data = {
        balanceSheetData: JSON.parse(balanceSheetRawData),
        profitLossData: JSON.parse(profitLossRawData)
    }
    return data;
};

module.exports = {
    getUserData
};
