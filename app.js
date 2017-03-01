const fetchData = (url) => {
  const request = new Promise((resolve, reject) => {
    fetch(url)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        resolve(res);
      }
      reject(`Unable to fetch data. Response code ${res.status}`);
    })
    .except(e => reject(e.message));
  });

  const timeoutRequest = new Promise((resolve, reject) => {
    setTimeout(reject, 1000, 'Request timed out');
  });

  return Promise
    .race([request, timeoutRequest])
    .then(res => {
      return res
    }, m => {
      throw new Error(m);
    });
}
