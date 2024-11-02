// prisma/seed.ts
import { PrismaClient, Stage, PostType, CampaignStatus, EventType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean up existing data
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.eventRSVP.deleteMany(),
    prisma.event.deleteMany(),
    prisma.groupMember.deleteMany(),
    prisma.group.deleteMany(),
    prisma.achievement.deleteMany(),
    prisma.resource.deleteMany(),
    prisma.contribution.deleteMany(),
    prisma.post.deleteMany(),
    prisma.campaign.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log('🧹 Cleaned up existing data');

  // Create users
  const hashedPassword = await bcrypt.hash('testpassword123', 10);
  
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@fun-time.org',
        name: 'Admin User',
        password: hashedPassword,
        stage: Stage.BUTTERFLY,
        bio: 'Platform administrator and community guide',
        location: 'Global',
        interests: ['community', 'education', 'technology'],
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane@fun-time.org',
        name: 'Jane Smith',
        password: hashedPassword,
        stage: Stage.LARVAE,
        bio: 'Environmental activist and community organizer',
        location: 'Stockholm',
        interests: ['environment', 'social-justice'],
      },
    }),
    prisma.user.create({
      data: {
        email: 'alex@fun-time.org',
        name: 'Alex Chen',
        password: hashedPassword,
        stage: Stage.EGG,
        bio: 'New to activism, eager to learn and contribute',
        location: 'Online',
        interests: ['technology', 'education'],
      },
    }),
  ]);

  console.log('👥 Created users');

  // Create tags
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'environment', description: 'Environmental initiatives and discussions' } }),
    prisma.tag.create({ data: { name: 'education', description: 'Educational resources and programs' } }),
    prisma.tag.create({ data: { name: 'technology', description: 'Technology-related initiatives' } }),
    prisma.tag.create({ data: { name: 'community', description: 'Community building and engagement' } }),
  ]);

  console.log('🏷️ Created tags');

  // Create a campaign
  const campaign = await prisma.campaign.create({
    data: {
      title: 'Digital Literacy Initiative',
      description: 'Helping communities bridge the digital divide',
      status: CampaignStatus.ACTIVE,
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      creatorId: users[0].id,
      tags: {
        connect: [
          { id: tags[1].id }, // education
          { id: tags[2].id }, // technology
        ],
      },
    },
  });

  console.log('📢 Created campaign');

  // Create posts
  await Promise.all([
    prisma.post.create({
      data: {
        title: 'Welcome to FUN(TIME)',
        content: 'Join us in creating meaningful change through individual effort and unity.',
        type: PostType.UPDATE,
        authorId: users[0].id,
        tags: { connect: [{ id: tags[3].id }] }, // community
      },
    }),
    prisma.post.create({
      data: {
        title: 'Getting Started with Digital Literacy',
        content: 'Learn how you can contribute to our digital literacy campaign.',
        type: PostType.RESOURCE,
        authorId: users[1].id,
        tags: { connect: [{ id: tags[1].id }, { id: tags[2].id }] }, // education, technology
      },
    }),
  ]);

  console.log('📝 Created posts');

  // Create a group
  const group = await prisma.group.create({
    data: {
      name: 'Digital Education Team',
      description: 'Coordinating digital literacy initiatives and events',
      members: {
        create: [
          {
            role: 'ADMIN',
            userId: users[0].id,
          },
          {
            role: 'MEMBER',
            userId: users[1].id,
          },
        ],
      },
    },
  });

  console.log('👥 Created group');

  // Create an event
  const event = await prisma.event.create({
    data: {
      title: 'Digital Literacy Workshop',
      description: 'Introduction to basic computer skills and internet safety',
      type: EventType.HYBRID,
      location: 'Community Center & Online',
      startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2 hours duration
      organizerId: users[0].id,
      campaignId: campaign.id,
      groupId: group.id,
    },
  });

  // Create RSVPs
  await Promise.all(
    users.map(user =>
      prisma.eventRSVP.create({
        data: {
          status: 'GOING',
          userId: user.id,
          eventId: event.id,
        },
      })
    )
  );

  console.log('📅 Created event and RSVPs');

  // Create resources
  await prisma.resource.create({
    data: {
      title: 'Digital Literacy Curriculum',
      description: 'Comprehensive guide for teaching digital skills',
      type: 'DOCUMENT',
      content: 'Detailed curriculum content...',
      authorId: users[0].id,
      campaignId: campaign.id,
      tags: {
        connect: [
          { id: tags[1].id }, // education
          { id: tags[2].id }, // technology
        ],
      },
    },
  });

  console.log('📚 Created resources');

  // Create achievements
  await Promise.all(
    users.map(user =>
      prisma.achievement.create({
        data: {
          title: 'Early Adopter',
          description: 'Joined the platform during its initial phase',
          criteria: 'Join during platform launch',
          userId: user.id,
          unlockedAt: new Date(),
        },
      })
    )
  );

  console.log('🏆 Created achievements');

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
