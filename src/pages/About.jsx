const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-white-800 mb-6 text-center">
        About <span className="text-blue-600">Us</span>
      </h1>

      {/* Intro Section */}
      <p className="text-gray-300 text-lg leading-relaxed text-center mb-10">
        Welcome to <span className="font-semibold text-gray-300">MyBlog</span>, 
        a space where ideas, stories, and experiences come alive. 
        Our mission is to share valuable insights on technology, lifestyle, and creativity 
        with readers worldwide.
      </p>

      {/* Flex Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="About us"
          className="rounded-2xl shadow-md"
        />

        {/* Text */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We’re a team of passionate developers, writers, and creators 
            who believe in the power of knowledge sharing. 
            Every blog post is crafted with research, creativity, and 
            a touch of personal experience.
          </p>

          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            What We Do
          </h2>
          <p className="text-gray-300 leading-relaxed">
            From coding tutorials to lifestyle hacks, 
            we aim to deliver high-quality content that empowers and inspires. 
            Whether you’re a beginner or a professional, there’s always something here for you.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      
    </div>
  );
};

export default About;
