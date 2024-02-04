let pendingRequests = {};
let reqData = {};

export async function blockingGet(key) {
  const promise = new Promise((resolve) => {
    pendingRequests[key] = () => {
      resolve(reqData);
      delete pendingRequests[key];
    };

    setTimeout(() => {
      resolve(null);
      delete pendingRequests[key];
    }, 30000);
  });

  return promise;
}

export async function push(key, data) {
  if (pendingRequests[key]) {
    reqData = data;
    pendingRequests[key]();
  }
}
