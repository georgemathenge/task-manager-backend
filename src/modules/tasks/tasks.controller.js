const  prisma  = require('../../prisma/prismaClient');
const  formattedDate  = require('../../utils/dateFormat');



exports.getAllFoodbase = async (req, res) => {
  try {
      // Extract query parameters for pagination and filtering
      const { page = 1, limit = 10, searchTerm = '', categoryTerm, status = '', items = '', set_status='' } = req.query;
      // Convert page and limit to integers for calculation
      const pageNumber = parseInt(page);
      const pageSize = parseInt(limit);
      const skip = (pageNumber - 1) * pageSize;
      // Perform the Prisma query with pagination and filtering
      const products = await prisma.tasks.findMany({
          skip: skip,
          take: pageSize,
          include: {
           users:{
            select:{
              user_name:true
            }
           },
            collaborations:{
              include:{
                users:{
                  select:{
                    user_name:true
                  }

                }
              }
            },
            task_history:{
              include:{
                users:{
                  select:{
                    user_name:true
                  }
                },

              }
            },
            task_comments:{
              include:{
                users:{
                  select:{
                    user_name:true
                  }
                },

              }
            }
          },
          orderBy: {
              id: 'asc'
          },
       

      });

      if (products.length > 0) {

          res.send({
              data: products,
              page: pageNumber,
              limit: pageSize,
              status: 230,
              message: "Retrieved Products Successfully"
          });
      }
      else {
          res.send({
              status: 404, message: "No data found",
              page: pageNumber,
              limit: pageSize,
          })
      }
  } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Failed to fetch products: ' + error.message });
  }
};
exports.getFoodBaseById = async (req, res) => {
  try {
      // Extract query parameters for pagination and filtering
      const { page = 1, limit = 10, searchTerm = '', categoryTerm, status = '', items = '', set_status='' } = req.query;
      console.log(req.params.id)
      // Convert page and limit to integers for calculation
      const pageNumber = parseInt(page);
      const pageSize = parseInt(limit);
      const skip = (pageNumber - 1) * pageSize;
      // Perform the Prisma query with pagination and filtering
      const products = await prisma.tasks.findMany({
          skip: skip,
          take: pageSize,
          where:{
            id:parseInt(req.params.id)
          },
          include: {
           users:{
            select:{
              user_name:true
            }
           }, 
        
          },
          orderBy: {
              id: 'asc'
          },
       

      });

      if (products.length > 0) {

          res.send({
              data: products,
              page: pageNumber,
              limit: pageSize,
              status: 230,
              message: "Retrieved Products Successfully"
          });
      }
      else {
          res.send({
              status: 404, message: "No data found",
              page: pageNumber,
              limit: pageSize,
          })
      }
  } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Failed to fetch products: ' + error.message });
  }
};

exports.findPlaces = async (req, res)=>{
      
        try {
            console.log(req.query)

            const  query  = req.query.shop_name; 
      
            if (!query) {
              return res.status(400).json({ error: 'Search query is required' });
            }
          const places = await prisma.tasks.findMany({
            where: {
                OR: [
                    {
                      title: {
                        contains: query, 
                      },
                    },
                    {
                      tags: {
                        contains: query, 
                      },
                    },
                  ],
            },
          });
      
         if(!places){
            res.send({status:404, message:"Result not Found"})
            return;
         }
         res.send({status:230, data: places})

        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to search places' });
        }
  
}

// exports.findNearbyPlaces = async (req, res) => {
//     try {

//       const { lat, lng, radius = 10000 } = req.query; // radius in meters

//       if (!lat || !lng) {
//         return res.status(400).json({ message: 'Latitude and Longitude are required' });
//       }
  
//       const userLat = parseFloat(lat);
//       const userLng = parseFloat(lng);
  
//       const places = await prisma.$queryRaw`
//         SELECT *, ST_Distance_Sphere(location, POINT(${userLng}, ${userLat})) AS distance
//         FROM base
//         WHERE ST_Distance_Sphere(location, POINT(${userLng}, ${userLat})) <= ${parseInt(radius)}
//         ORDER BY distance ASC
//       `;
  
//       res.json({
//         status: 200,
//         message: 'Nearby shops retrieved successfully',
//         data: places,
//       });
//     } catch (error) {
//       console.error('Error finding nearby places:', error);
//       res.status(500).json({ message: 'Failed to fetch nearby places' });
//     }
//   };

exports.updateTask = async (req, res)=>{
      
  try {

    
      const  query  = req.params.id; 

      if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const existingTask = await prisma.tasks.findUnique({
        where: { id: parseInt(query) }
      });
      



    const tasks = await prisma.tasks.update({
      where: {
          id:parseInt(query)
      },
      data:{
        title:req.body.title,
        description:req.body.description,
        scheduled_time:req.body.dueDate,
        status:req.body.status
      }
    });
  
    // 3. Track changes
    const changes = [];
    

    if ('status' in req.body && existingTask.status !== req.body.status) {
      changes.push(`Status changed from "${existingTask.status}" to "${req.body.status}"`);
    }
    
    if ('title' in req.body && existingTask.title !== req.body.title) {
      changes.push(`Title changed from "${existingTask.title}" to "${req.body.title}"`);
    }

// if (new Date(existingTask.scheduled_time).toISOString() !== new Date(req.body.dueDate).toISOString()) {
//   changes.push(`Due date changed from "${formattedDate(existingTask.scheduled_time)}" to "${formatDate(req.body.dueDate)}"`);
// }
    
if (changes.length > 0) {
  for (const desc of changes) {
    await prisma.task_history.create({
      data: {
        task_id: parseInt(query),
        description: desc,
        // user_id: req.user.id,
      },
    });
  }
}

   if(!tasks){
      res.send({status:404, message:"Task not Found"})
      return;
   }
   res.send({status:230, data: tasks, message:"Updated Successfully"})

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to search places' });
  }

}