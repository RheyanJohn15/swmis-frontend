const text = {
    App: "Silay Waste Management Information Systems",
    title: "SWMIS",
    intro: "Silay Waste Management Information System (SWMIS) is an innovative application designed to streamline and enhance waste collection and management in the city of Silay. The system offers real-time tracking of garbage trucks, optimized route planning, and detailed reporting to ensure efficient waste collection, reduce operational costs, and promote environmental sustainability.",
    feat:{
        header: "Key features include:",
        subheader: "The SWMIS aims to create a smarter, more efficient waste management process, benefiting both the city's infrastructure and its residents.",
        f1: "Real-Time GPS Tracking",
        f1sub: "Monitor the current location of garbage trucks, ensuring that each vehicle stays on its designated route and completes its tasks on time.",
        f2: "Data Analytics and Reporting",
        f2sub: "The system provides insights into the waste collection process, such as truck performance, route efficiency, and areas needing improvement.",
        f3: "Environmental Impact",
        f3sub: "By improving waste collection efficiency, the system helps minimize carbon emissions and promotes a cleaner, greener city.", 
        f4: "Route Optimization",
        f4sub: "Automatically generate the most efficient routes for waste collection, reducing fuel consumption and improving overall productivity.",
    },
    Login:{
        title: "Login SWMIS",
        username: 'Enter your username',
        password: 'Enter your password',
        button: 'Login'
    },
    Navigation: {
        dash: "Dashboard",
        td: "Truck & Drivers",
        routes: "Routes",
        sched: "Schedules",
        complaints: "Residence Complaints",
        nav: "Map & Navigation",
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
    },

    truck_drivers:{
        header: "Truck & Drivers",
        subheader: "Manage list of truck and drivers that collects your waste",
        addDriver: "Add Drivers",
        addTruck: "Add Trucks",
        addDModal: {
            username: "Username",
            password: "Password",
            fname: "Firstname",
            lname: "Lastname",
            contact: "Contact",
            license: "License",
            address: "Address",
            add: "Submit Driver Details",
            loading: "Submitting driver details please wait....",
            deleting: "Deleting driver please wait....",
            updating: "Updating driver details please wait...."
        },
        addTModal: {
            model: "Model",
            plate: "Plate Number",
            carry: "Capacity",
            driver: "Assigned Driver",
            add: "Submit Truck Details",
            loading: "Submitting truck details please wait....",
            deleting: "Deleting truck please wait....",
            updating: "Updating truck details please wait...."
        }
    },
    Routes:{
        header: "Routes",
        subheader: "All routes for truck driver to follow when collecting waste",
        add: "Add Routes",
        searching: "Searching database for all the routes",
        addRoute:{
            routelabel: "Route Name/Code",
            routeplaceholder: "eg. Route 1/734CYS",
            selectLabel: "Select Route Driver",
            selectPlaceHolder: "-----Select Driver------",
            waypoints: "List of Waypoints",
            submit: "Submit Route Details",
            loading: "Submitting route details please wait...."
        }
    }, 
    Complaints:{
        header: "Complaints",
        subheader: "If you have complaints send us a message",
        form:{
            name: "Complainant Name",
            nameHolder: "Name",
            contact: "Contact",
            contactHolder: "09#########",
            nature: "Nature of complaints",
            natureHolder: "-----Select Nature of complaint-------",
            remark: "Remarks",
            remarkHolder: "Describe your complaint",
            submit: "Submit Complaint",
            loading: "Submittting complaint please wait....."
        }
    }
}

export default text