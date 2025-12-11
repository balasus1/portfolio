import { motion } from "framer-motion";
import { Clock, ArrowUpRight, Tag } from "lucide-react";
import { blogPosts } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";

const BlogSection = () => {
  return (
    <section id="blog" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading title="Latest Insights" subtitle="Blog">
          Thoughts on architecture, development, and technology trends
        </SectionHeading>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card overflow-hidden group hover-lift cursor-pointer"
            >
              {/* Gradient Header */}
              <div className="h-40 relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    index === 0
                      ? "from-cyan-500/30 to-blue-600/30"
                      : index === 1
                      ? "from-purple-500/30 to-pink-600/30"
                      : "from-orange-500/30 to-red-600/30"
                  }`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-background/10 backdrop-blur-sm flex items-center justify-center">
                    <Tag className="w-8 h-8 text-foreground/80" />
                  </div>
                </div>
                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs bg-secondary rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="gap-2">
            View All Posts
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
