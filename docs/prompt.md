# Prompt

I want to create a responsive photo gallery to showcase my photography.

## Technology

I will use only HTML and CSS, and some basic Javacript, without a database.

I will host the site on Github Pages, so we must stay within the limitations of this hosting.

I suggest to use the JS library slick to manage the gallery's functionality, but I'm open to other suggestions.

## File Locations

All my photos will be in a folder called `/photos`.

The website presents all the photos found in that folder.

## Displaying Metadata

Ideally, I want to display selective metadata from the photos on the webpage, such as location data, camera capture info (exposure, aperture, ISO..), dates, and more, so it should support EXIF parsing.

If that's not possible, we can use a simple text file (csv or XML or JSON) to do that, but that increases my effort.

## Lazy loading

The first image should be shown clearly on first page load.

## Layout

The images should be displayed in a simple horizontal linear layout.

## Sorting

The images should be displayed sorted by date, from newest to oldest.

## Infinite rotation

The gallery should repeat infinitely, cycling seamlessly through all images in a loop, so that the user can continue to browse.

e.g. 1,2,3,4,5,6,7,8,9,10,1,2,...

### Navigating by Mouse

The user should be able to scroll wheel or drag with their mouse to move through the gallery.

### Navigating by Gesture

The user should be able to swipe with their finger to move through the gallery.

### Navigating by Keyboard

The user should be able to use the (`left` OR `up` `shift+tab`) and (`right` or `down` or `tab`) arrow keys to move through the gallery.

## Safety

Users should be restricted from downloading, saving, copying or otherwise taking my photos as much as possible.

## Responsiveness

On smaller widths, switch from a horizontal layout to vertical.

The gallery should resizes itself to fit in the browser.

## Relative Paths

Uses relative paths so we can deploy the site anywhere

## Performance

Each image will have an accompanying thumbnail in the same directory, with a predictable name.

e.g. `image_01.jpg` should have a thumbnail called `image_01-optimised.jpg`.

In full screen, thumbnails can be displayed until the high resolution image has been fully loaded.

If we can do this in code, that would reduce my effort when adding new images.

## Configurable code

Use variables to allow all properties, behavious and styles to be easily configurable.

## Modular code

Split each concern into useful modules of CSS or JS as needed for easy management and maintainance.
