import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: {},
    user_id: null,
    posts: [],
    post: {},
    categoryTypes: {
      fuelType: 'Any',
      city: '',
      gearType: 'Any',
      vehicleType: 'Any',
      yearMax: '',
      yearMin: '',
      vehicleName: 'CHR',
    },
    pickupLocation: '',
    destination: '',
  },
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    setUserId(state, action) {
      state.user_id = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    setCategoryTypes(state, action) {
      state.categoryTypes = action.payload;
    },
    setPickupLocation(state, action) {
      state.pickupLocation = action.payload;
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
  },
});

export const {
  setUserDetails,
  setUserId,
  setPosts,
  setPost,
  setCategoryTypes,
  setPickupLocation,
  setDestination,
} = userSlice.actions;
export default userSlice.reducer;
