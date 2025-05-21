## TODO

- [ ] write UI for camera-roll pictures
    - [x] expo-media-library
    - [x] getPhotos, populate state
    - [x] add extra button for the camera which will be the first index in the array (grid of stuff)
        - after taking picture with camera, go back to previous UI and use the newly taken pic as the preview
    - [x] preview currently selected image on the top half of the screen.
    - [ ] button at the bottom to go to next screen
        - [ ] next screen is the cropper
        - [ ] after cropping is done move to final screen
    - [ ] final screen is a cropped version of the picture with a optional text description field below
    - [ ] button at the bottom to post the picture


- [ ] Camera stuff
    - react-native-vision-camera vs expo-camera
    - react-native-image-crop-picker vs expo-image-manipulator. See: https://docs.expo.dev/versions/latest/sdk/imagemanipulator/

- [x] Auth
    - [x] AuthService
    - [x] Handle token login during application onLoad
    - [x] Login screen

- [x] use expo-secure-store
    - [x] refresh token (auth_t)
    - [x] selected color scheme (user_color_scheme)
    - [ ] store images by posts id. A post looks at storage before asking for its image from the DB
        - use JS Map type to manipulate items. secure-store key "images": [ ["key", "val" ], ["key2", "val2"] ];
    - [ ] never fetch / refetch posts unless first load or manually called refresh

- [x] manage images from camera roll to be loaded on demand
    - [x] if image container is considered out of view for more than 1s then replace the content with a simple placeholder view
    - [x] as the image container is brought back into view (any %), immediately show it again.

- picture format is 1920 x 1080 with ScreenAspectRatio (Dimensions.get("window").height / Dimensions.get("window").width)
- any1 of these, see [instagram image formats](https://influencermarketinghub.com/instagram-image-sizes/)
    - add basic editor for cropping image before posting, 1:1 ratio of 1080 x 1080
    - add basic editor for cropping image before posting, 4:5 ratio of 864 x 1080
- build UI around the above format

- [ ] design a layout
    - [x] design a bottom bar (feed screen | camera screen | personal screen)
    - [x] (wip) make a feed screen
        - [x] 1/1 ratio image posts
        - [ ] (wip) scroll down to lazy load more posts
    - [ ] mock personal screen
        - [ ] header flex-row = profile pic circle + real name, under the real name but still right of circle the username
        - [ ] 2 image wide grid of posts, only show image
            - click on image to load the post as its own sub-screen of personal screen
            - above images in a small tab bar-esque thing there's a button for bookmarked posts to scroll through, looks like personal image viewer
    - [x] camera screen
        - [ ] design camera UI
            - [ ] take photo design
            - [ ] __(THIS WILL REQUIRE A REAL REFACTOR OF THE DB SERVER POSSIBLY)__ record video design
                - investigate how streaming the binary data would work for viewing videos.
        - [ ] upload FS image instead of taking new picture for post

---

#### POSTS

- [ ] media object type
    - source
    - type

- [ ] post object type
    - media
        - media_object
    - description_text

#### POST SCREEN

- [x] post layout (re-use across feed screen and personal screen)
- 
