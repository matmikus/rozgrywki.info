export default function(req, res, next) {
  console.log(req.path);
  res.send('to jest api');
}