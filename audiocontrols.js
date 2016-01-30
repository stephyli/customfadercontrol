
vcControl = function () {
  function faderCapDown(event)
  {
    //fadercap via onmousedown event
    var faderCap =  event.target;
    document.addEventListener("mousemove", faderCapMove);
    document.addEventListener("mouseup", faderCapUp);
    //x,y coordinates for onmousedown event
    var mouseDownX=event.clientX;
    var mouseDownY=event.clientY;
    //positions of fadercap during mousedown event
    var mouseDownFaderCapRect= faderCap.getBoundingClientRect();
    var mouseDownFaderCapLeft=mouseDownFaderCapRect.left;
    var mouseDownFaderCapTop=mouseDownFaderCapRect.top;
    //parent element
    var fader1 = faderCap.parentElement;
    //positions of static parent element
    var fader1Rect= fader1.getBoundingClientRect();
    var fader1Top = fader1Rect.top;
    var fader1Left = fader1Rect.left;
    var faderParentHeight=fader1Rect.height;
    var faderParentWidth=fader1Rect.width;
    //positions of fadercap during movemove event
    var faderCapRect= faderCap.getBoundingClientRect();
   function faderCapMove(event){
//x,y coordinates for mousemove event
     var mouseMoveX=event.clientX;
     var mouseMoveY=event.clientY;
     //current change [endpoint(mousemove)-beginning(mousedown)]
     var changeX=mouseMoveX-mouseDownX;
     var changeY=mouseMoveY-mouseDownY;
     //distance of fadercap during mousedown from parent element(initial mousedown)
     var faderCapRelativeToFader1X=mouseDownFaderCapLeft-fader1Left;
     var faderCapRelativeToFader1Y=mouseDownFaderCapTop-fader1Top;
     //initial(mousedown)+current change(mousemove)
     var outputX=faderCapRelativeToFader1X+changeX;
     var outputY=faderCapRelativeToFader1Y+changeY;
     //if width of parent element is greater than it's height, execute the following
     if ( faderParentWidth>faderParentHeight ){
     // do not let fadercap move past below parent element
     if (outputX> (fader1Rect.width-faderCapRect.width)){
     faderCap.style.left = (fader1Rect.width-faderCapRect.width)+ "px";
     //do not let fadercap move past above parent element
    } else if  (outputX < 0) {
      faderCap.style.left = 0;
    //allow fadercap to move within parent element
      }else {
      faderCap.style.left = outputX+"px";
      }
    }
      //if width of parent element is not greater than it's height, execute the following
      else if (outputY  > (fader1Rect.height-faderCapRect.height)){
      faderCap.style.top = (fader1Rect.height-faderCapRect.height)+ "px";
    } else if  (outputY < 0) {
      faderCap.style.top = 0;
      }else {
      faderCap.style.top = outputY+"px";
      }
    }
    function faderCapUp(event){
      // detect that mouse is not down
      document.removeEventListener("mousemove", faderCapMove);
      document.removeEventListener("mouseup", faderCapUp);
    }
  }
  function addTargetActionForControlEvents(element, callback)
  {
  }
    return {
    // Public methods and variables
    faderCapDown: faderCapDown,
    addTargetActionForControlEvents: addTargetActionForControlEvents
  };
}();
/*
vcController = function () {
    // Private methods and variables
    var vcModelListeners = {};
    function setFaderCapPosition(element, value)
    {
    }
    function faderCapTouch(event)
    {
      var fadercap =  event.target;
      // detect that mouse is down
      document.addEventListener("mousemove", faderCapMove);
      document.addEventListener("mouseup", faderCapRelease);
      function faderCapMove(event){
        //if mouse moves below "fader1" set at bottom, if above, set at 0
        // if mouse is down, position the cap to where the mouse has moved to
        var fader1 = fadercap.parentElement;
        var fader1rect= fader1.getBoundingClientRect();
        var fadercaprect= fadercap.getBoundingClientRect();
        var top = fader1rect.top;
        var y = event.clientY-top;
        if (y > (fader1rect.height-fadercaprect.height)){
        fadercap.style.top = (fader1rect.height-fadercaprect.height)+ "px";
        } else if  (y < 0) {
        fadercap.style.top = 0;
        }else {
        fadercap.style.top = y+"px";
        }
      }
      function faderCapRelease(event){
        // detect that mouse is not down
        document.removeEventListener("mousemove", faderCapMove);
        document.removeEventListener("mouseup", faderCapRelease);
      }
    }
    function updateFader(event)
    {
      // move fader cap.
    }
    function updateControl(event)
    {
      if (event.type != "updateControl")
        return;
      var detail = event.detail;
      if (!detail) return;
      var listeners = vcModelListeners[detail.id];
      if (listeners)
      {
        for (var i=0; i<listeners.length; i++)
        {
        }
      }
    }
    function addControlListener(element, id)
    {
      if (!vcModelListeners[id])
      {
        vcModelListeners[id] = [];
      }
      vcModelListeners[id].push(element);
    }
    // init can be called to set up existing DOM elements automatically.
    function init()
    {
      // set all fader cap elements to listen for mouse down
      var faderCaps = document.querySelectorAll("[vc-fader-cap]");
      for (var i=0; i<faderCaps.length; i++)
      {
        faderCaps[i].addEventListener("mousedown", faderCapTouch);
      }
      // get all elements with vc-id attribute
      // and store a mapping
      var controls = document.querySelectorAll("[vc-id]");
      for (var i=0; i<controls.length; i++)
      {
        var vcId = controls[i].getAttribute("vc-id");
        if (vcId)
          addControlListener(controls[i], vcId);
      }
      // start listening for updates
      document.addEventListener("vcontrolUpdate", updateControl);
    }
  return {
    // Public methods and variables
    init: init,                   // use this to automatically setup controls
    faderCapTouch: faderCapTouch, // use this to handle mouse down or touch events
    updateFader: updateFader,     // use this to send an event to update a fader.
    updateControl: updateControl, // use this to receive control metadata update events
  };
}();
*/
