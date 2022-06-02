import Box from '@mui/material/Box';
function autoEmTag (str, color, colorHeighlight, emTagClass) {
  const fragment = str.split(/(?:<\/?em>)|(?:<\/?strong>)|(?:<\/?i>)/);
  let ret = [];
  let sign = false;
  for (let key = 0, len = fragment.length; key < len; key++) {
    const ele = fragment[key];
    ret.push(
      <Box
        key={key}
        component="span"
        className={`${sign ? 'hl' : 'n'} ${emTagClass || ''}`}
        color={sign ? colorHeighlight : color}
        sx={{ p: 0, m: 0 }}
      >
        {ele}
      </Box>
    )
    sign = !sign;
  }
  return ret;
}
function seconds2Date (seconds = 0) {
  let date = new Date()
}
const EXPORT = {
  autoEmTag: autoEmTag
}
export default EXPORT;