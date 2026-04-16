function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById('1Pl4hGiPqQXz_15hEXpSGwbAg-IIYHvvLqmwpBe5zx6Q').getSheetByName('לידים');
    var data = JSON.parse(e.postData.contents);

    var name = data.name ? data.name.trim() : '';
    var email = data.email ? data.email.trim() : '';
    var phone = data.phone ? data.phone.trim() : '';
    var platformName = data.platformName ? data.platformName.trim() : '';

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['#', 'Date', 'Name', 'Email', 'Phone', 'Platform Name']);
    }

    var rowNum = sheet.getLastRow();
    sheet.appendRow([rowNum, new Date().toLocaleString('he-IL'), name, email, phone, platformName]);

    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
