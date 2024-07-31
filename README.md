## idea

Browser-based reference board (like PureRef) for people who don't want to or can't install apps (e.g. Chromebooks/managed computers/personal preference).

## to-do

- [ ] drag select
    - [ ] detect drag start and drag end on canvas, on drag move update selection box. will this work in FF?
    - [ ] loop through all RefImages and test if intersects selection box using x/y/width/height 
    - [ ] mass delete, just loop through urls
    - [ ] mass move and resize, move selected Rnds into transparent wrapper Rnd?
- [ ] drag 'n drop image upload (react dropzone? manual implementation?)
- [ ] auto-save to IndexedDB - could I just save the entire refMap???
- [ ] arrange images optimally
- [ ] undo/redo - keep stack of "Action" objects - undo function takes in Action and undoes it based on Action type using Action data
- [ ] pan and zoom canvas

## for kluo
- [ ] export into zip (image files + JSON describing x,y,width,height)
    - We use the React.js Javascript library with the Next.js React Framework
    - https://react.dev/ - React.js tutorial
    - https://nextjs.org/ - Next.js tutorial. Next just helps with React development. You don't have to "learn" Next.
    - Possible steps:
        1. Make a ExportButton.tsx component (refer to UploadButton.tsx)
        2. Use the `useStore` global state management hook to access refMap
        3. Loop through the values of refMap, which have now been updated to contain all the data you need (x, y, width, height)
- [ ] import from archive

## done

- [x] fix RefImage having un-updated height before interaction by calculating and updating height in img.onload
- [x] add debug tools
- [x] RefImages now update/sync position and size with store's refMap, surfacing those values for zip export
- [x] refactor to not keep JSX in store but rather RefData objects
- [x] context menu ui polish
- [x] selection handles
- [x] delete and paste using keyboard
- [x] add image by pasting
- [x] context menu
- [x] delete image
- [x] move and resize images
- [x] add image by uploading file
