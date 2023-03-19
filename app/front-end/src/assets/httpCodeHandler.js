const FOUR_HUNDRED_FOUR = 404;
const FOUR_HUNDRED_NINE = 409;
const FOUR_HUNDRED_ONE = 401;
const TWO_HUNDRED = 200;
const TWO_HUNDRED_ONE = 201;

const notFound = (code) => code === FOUR_HUNDRED_FOUR;

const conflict = (code) => code === FOUR_HUNDRED_NINE;

const unauthorized = (code) => code === FOUR_HUNDRED_ONE;

const success = (code) => code === TWO_HUNDRED;

const created = (code) => code === TWO_HUNDRED_ONE;

export default {
  notFound,
  success,
  created,
  conflict,
  unauthorized,
};
