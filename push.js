const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BBqAjDv59YRGw0qdRkpw2SiVaUFbA8FGCmiNejhUqwUQBnkwyaKaHig_IF6Qy5b0Sswjo6Spyr8IevLrV1tNoug",
   "privateKey": "l8wc-3ivDwu5wBaOzbMDJrPVr_AHb2PenuHJg6Zrb_Q"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eZ4HwUOJmoI:APA91bF4tA9jgAfkAQiwhqXBdmGH4d-IiwfRJEuPfQsP_TJKS9dm0fXRPzSE47-xZhZIEMojy9yrok_l_UOV18myXBADcaDwnEUIWAULIxjIQI8Jw_cnQaXeQtIBlC5rWS8Lb_xkpZbn",
   "keys": {
       "p256dh": "BO8CrhahesmfHZT4Xpt1tSW/ki7BRCtQxF1EEROJTj/cTYghJ94WLxphkvXQZrXt/WbmvhMFla5a0zAuEzZds3A=",
       "auth": "/4mriBurxcz5tZ6vWjRdug=="
   }
};
const payload = 'Yay ! Now you can receive push notification!';
 
const options = {
   gcmAPIKey: '782151986978',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);