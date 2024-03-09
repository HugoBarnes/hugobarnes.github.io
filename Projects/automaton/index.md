---
layout: post
title: "Automaton: A 3D Printed Drawing Machine"
---

A drawing machine inspired by the movie Hugo.
Powered by an Arduino Uno and a CNC shield.
Uses Universal G-Code Sender. I used Inkscape
and various websites to create the designs.

---

![body](Automaton Body.jpg)
{: .tom-image}

This drawing machine was 3D printed on a Prusa Mini and followed
Thingiverse user henryarnold's guide for building it. The guide
is no longer available unfortunately. 

The drawing machine is similar to a 3D printer with minimal z-axis 
functionality. The computer moves the pen carriage around, constrained
only by x and y distances. A 9g servo moves the pen up and down.
When the pen is down, the weight of the carriage helps apply the ink
to the page beneath. The arduino uno and cnc board work with UGS, 
(Universal GCode Sender), to provide instructions and commands for the
two x,y motors and the servo (z) motor.

![ugs](UGSpic.jpg)

The universal GCode Sender seen above.

[Watch the drawing machine video on Google Drive](https://drive.google.com/file/d/1Q7oVU36J3sEdZmV7bQuHMfV-TkB80hQm/view?usp=sharing)

![wallprojectpicture](WallProjectPicture.jpg)
