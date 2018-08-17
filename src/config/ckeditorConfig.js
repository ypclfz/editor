export default {
  title: '发明专利编辑器',
  // Define the toolbar: http://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_toolbar
  // The full preset from CDN which we used as a base provides more features than we need.
  // Also by default it comes with a 3-line toolbar. Here we put all buttons in a single row.
  toolbar: [
    { name: 'document', items: [ 'Print' ] },
    { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
    { name: 'styles', items: [ 'Format', 'Font', 'FontSize' ] },
    { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting' ] },
    { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
    { name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
    { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
    { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
    { name: 'insert', items: [ 'EasyImageUpload', 'Table', 'Mathjax', 'PageBreak' ] },
    { name: 'tools', items: [ 'Maximize' ] },
    { name: 'editing', items: [ 'Find', 'Replace', 'Scayt' ] }
  ],
  height: 800,
  mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
  extraAllowedContent: 'h1[id]; h2[id]',
  extraPlugins: 'easyimage,imageresizerowandcolumn',
  removePlugins: 'image,uploadfile',
  // Upload images to a CKFinder connector (note that the response type is set to JSON).
  // uploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
  // Configure your file manager integration. This example uses CKFinder 3 for PHP.
  // filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
  // filebrowserImageBrowseUrl: '/ckfinder/ckfinder.html?type=Images',
  // filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
  // filebrowserImageUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',

  // The following options are not necessary and are used here for presentation purposes only.
  // They configure the Styles drop-down list and widgets to use classes.
  // stylesSet: [
  //  { name: 'Narrow image', type: 'widget', widget: 'image', attributes: { 'class': 'image-narrow' } },
  //  { name: 'Wide image', type: 'widget', widget: 'image', attributes: { 'class': 'image-wide' } }
  // ],

  // Load the default contents.css file plus customizations for this sample.
  // contentsCss: [ CKEDITOR.basePath + 'contents.css', 'https://sdk.ckeditor.com/samples/assets/css/widgetstyles.css' ],
  // Configure the Enhanced Image plugin to use classes instead of styles and to disable the
  // resizer (because image size is controlled by widget styles or the image takes maximum
  // 100% of the editor width).
  // image2_alignClasses: [ 'image-align-left', 'image-align-center', 'image-align-right' ],
  // image2_disableResizer: true

  // easy image
  // extraPlugins: 'easyimage',
  easyimage_toolbar: [
    'EasyImageFull',
    'EasyImageSide',
    // 'EasyImageGradient1',
    // 'EasyImageGradient2',
    // 'EasyImageNoGradient',
    'EasyImageAlt'
  ],
  cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
  cloudServices_tokenUrl: 'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt'
}
