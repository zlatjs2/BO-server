const StringUtil = {};

// 넘겨준 값이 빈값인지 체크
StringUtil.isEmpty = value => {
  if (value === '' || value === null || value === undefined) {
    return true;
  } else {
    return false;
  }
};

module.exports = StringUtil;
