const createAsyncActionTypes = (actionType) => ({
  PENDING: `${actionType}_PENDING`,
  SUCCESS: `${actionType}_SUCCESS`,
  FAILURE: `${actionType}_FAILURE`
});

export default createAsyncActionTypes;