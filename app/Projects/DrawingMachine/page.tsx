export default function page(){
    return (
        <div className="text-sm p-2">
        <p className="mb-4"> Welcome to Automaton, my 3D printed Arduino Uno powered Drawing Machine!</p>
        <p className="mb-4">
            I built this drawing machine the summer before my Senior year of high school. It cost around 100 dollars to build and I followed
            a guide on Thingiverse. Sadly the guide is no longer available. Below are some pictures of the art that can be made and a little bit about using the machine.
        </p>
        <img src="/images/cornerpic.jpg" alt="meWithArt" className="mx-auto mb-6"></img>
        <p className="mb-4">
            Above is the corner of my bedroom. The artwork made on printer paper is made by the 
            drawing machine, while the two skulls were not.
        </p>
        <img src="/images/Automaton Body.jpg" alt="automatonBody" className="mx-auto mb-6"></img>
        <p className="mb-4">
            A top down view of the drawing machine. The carriage moves along two axes, providing movement in the X and Y directions.
            A pen is screwed into the Z-axis. The blue component, (Z-axis), 
            attached to the carriage is driven upwards and downards by a 9g servo motor. 
        </p>
        <img src="/images/UGSpic.jpg" alt="gCodeSender" className="mx-auto mb-6"></img>
        <p className="mb-4">
            After converting a PNG image into a bitmap, an inkscape extension allows for a .gcode file to be created and opened
            in the UGS ( Universal G-Code Sender ) above.
        </p>
       <video className="mx-auto mb-6" width="640" height="360" controls>
            <source src="/movies/DrawingMachineTimeLapse.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div>
    )
}