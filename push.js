const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BPo2DFQk0ndeUuyc-oMtGd4FbejHKU82dPSQ5O_hGXiRxMtG6kTYP7JZGrnbcu71fPnh_QXnMz0LPgXBoAnp3WE",
   "privateKey": "QBg40mzQ2_vJVio-1rIsuTO-XZW_NSEKgfCIqgKpLDY"
};
 
 
webPush.setVapidDetails(
   'mailto:anitadewi7789@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/e2BWfjn_LR0:APA91bGLBWWXZ90rcF5p1YUqyIFuR94ouYsdp5msLpWoC_qJQAi4mJrfMEBOc-u8S6VWoPAUxX_zqr2Q4IOo9RKXXXZ9R5jqaq98-Ndm9xRKH88tF8zsyhrHpT5D8onWkkZ0uHOVK4oS",
   "keys": {
       "p256dh": "BHwD1Ebh3buGcvP9LbeAeP44O5eJrOW/c0QkcILELg+mjNV9Ao2qxguixeMjVOJTRtwMuFik8VysRMR44J9zr3k=",
       "auth": "lmTkPITRImfOSnJTioGRlQ=="
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