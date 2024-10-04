// // import React, { useEffect, useRef } from 'react';
// // import * as THREE from 'three';
// // import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// // const Gundam3DModel = () => {
// //     const mountRef = useRef(null);

// //     useEffect(() => {
// //         let scene, camera, renderer;

// //         const init = () => {
// //             scene = new THREE.Scene();
// //             camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// //             camera.position.z = 5;

// //             renderer = new THREE.WebGLRenderer({ antialias: true });
// //             renderer.setSize(window.innerWidth, window.innerHeight);
// //             mountRef.current.appendChild(renderer.domElement);

// //             const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
// //             scene.add(light);

// //             const loader = new GLTFLoader();
// //             loader.load('./image/gundam3D.glb', function (gltf) {
// //                 scene.add(gltf.scene);
// //                 animate();
// //             }, undefined, function (error) {
// //                 console.error(error);
// //             });
// //         };

// //         const animate = () => {
// //             requestAnimationFrame(animate);
// //             renderer.render(scene, camera);
// //         };

// //         const handleResize = () => {
// //             camera.aspect = window.innerWidth / window.innerHeight;
// //             camera.updateProjectionMatrix();
// //             renderer.setSize(window.innerWidth, window.innerHeight);
// //         };

// //         window.addEventListener('resize', handleResize);
// //         init();

// //         return () => {
// //             window.removeEventListener('resize', handleResize);
// //             mountRef.current.removeChild(renderer.domElement);
// //         };
// //     }, []);

// //     // return <div ref={mountRef} style={{ width: '100%', height: '400px' }}></div>;
// //     return <div ref={mountRef} style={{ width: '600px', height: '580px' }}></div>;
// // };

// // export default Gundam3DModel;

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// const Gundam3DModel = () => {
//     const mountRef = useRef(null);

//     useEffect(() => {
//         let scene, camera, renderer;

//         const init = () => {
//             scene = new THREE.Scene();
//             camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
//             camera.position.z = 5;

//             renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//             renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//             mountRef.current.appendChild(renderer.domElement);

//             const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
//             scene.add(light);

//             const loader = new GLTFLoader();
//             loader.load('./image/gundam3D.glb', function (gltf) {
//                 scene.add(gltf.scene);
//                 animate();
//             }, undefined, function (error) {
//                 console.error(error);
//             });
//         };

//         const animate = () => {
//             requestAnimationFrame(animate);
//             renderer.render(scene, camera);
//         };

//         const handleResize = () => {
//             camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//         };

//         window.addEventListener('resize', handleResize);
//         init();

//         return () => {
//             window.removeEventListener('resize', handleResize);
//             mountRef.current.removeChild(renderer.domElement);
//         };
//     }, []);

//     return <div ref={mountRef} style={{ width: '100%', height: '100%' }}></div>;
// };

// export default Gundam3DModel;




import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Gundam3DModel = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer;

        const init = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
            camera.position.z = 2; // Adjusted for better view

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
            mountRef.current.appendChild(renderer.domElement);

            const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
            scene.add(light);

            const loader = new GLTFLoader();
            loader.load('./image/gundam3D.glb', function (gltf) {
                const model = gltf.scene;
                model.scale.set(0.5, 0.5, 0.5); // Adjust scale if needed
                model.position.y = -0.5; // Center model vertically
                scene.add(model);
                animate();
            }, undefined, function (error) {
                console.error(error);
            });
        };

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        const handleResize = () => {
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);
        init();

        return() => {
            window.removeEventListener('resize', handleResize);
            if (renderer && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} style={{ width: '600px', height: '580px', margin: 'auto' }}></div>;
};

export default Gundam3DModel;
