srima
=====

Srima is a lightweight library to really become responsive in HTML image tags. Based on source maps srima is able to
 choose the right format for specific devices.
 
What it does NOT:

* Solve the problem of cropping images automatically in each format
* Generate the image source maps

## Getting started

* Create a source map for your images
* Get the minified file and load it into your project
* Load the source map into the lib

        <script>
            window.commonJsStrict.srima(
                    {
                        "my_image_name": {
                            "700": "img/my_image_name_mobile.jpg",
                            "1000": "img/my_image_name_hdready.jpg"
                        }
                    }
            );
        </script>

* Tag images: `<img data-srima="my_image_name" />`
* Srima takes care of the rest